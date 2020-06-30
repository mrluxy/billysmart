#!/usr/bin/env python
import RPi.GPIO as GPIO
import asyncio
import UltrasonicRanging as Sonar
import SweepBilly as Swilly
import time
import RFID
from state import State


class StateMachine:
    async def start(self, initialState):
        self.currentState = initialState
        await self.currentState.run()
        self.stateName = self.currentState.__class__.__name__
        return self

    async def next(self, request):
        self.currentState = await self.currentState.next(request)
        print(self.currentState)
        self.stateName = self.currentState.__class__.__name__
        print("CHANGEMENT STATUT " +self.stateName)
        await self.currentState.run()

    async def getCurrentState(self):
        await self.ws_send.send(self.stateName)
        return self.stateName

class Waiting():
    async def run(self):
        RFID.setup()
        RFID.loop()
        await interface.next(State.opening)

    async def next(self, request):
        return Interface.opening


class Opening():
    async def run(self):
        Swilly.setup()
        #GPIO.setmode(GPIO.BOARD)
        Swilly.open()
        time.sleep(4)
        await interface.next(State.eating)

    async def next(self, request):
        return Interface.eating

class Eating():
    async def run(self):
        Sonar.setup()
        Sonar.loop()
        await interface.next(State.closing)

    async def next(self, request):
        return Interface.closing

class Closing():
    async def run(self):
        #GPIO.setmode(GPIO.BOARD)
        Swilly.setup()
        Swilly.close()
        print("FIN")
        await interface.next(State.waiting)

    async def next(self, request):
        return Interface.waiting

class Interface(StateMachine):
    async def start(self):
        await StateMachine.start(self, Interface.waiting)
        return self

    async def next(self, State):
        await StateMachine.next(self, State)

    async def getCurrentState(self):
        await StateMachine.getCurrentState(self)

interface=Interface()
Interface.waiting = Waiting()
Interface.eating = Eating()
Interface.closing = Closing()
Interface.opening = Opening()
asyncio.get_event_loop().run_until_complete(interface.start())
asyncio.get_event_loop().run_forever()
#interface.start()