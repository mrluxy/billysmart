import RPi.GPIO as GPIO
import asyncio
import datetime
import time
from state import State
import SweepReservoir as Swilly
from request import giveMeYourArray

hour = int(datetime.datetime.now().strftime("%H"))
giveMeYourArray.getConf()
#single = ['test']

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

class Checking():
    async def run(self):
        #for x in single:
         #   print(x)
        print(giveMeYourArray.horraires)
        for x in giveMeYourArray.horraires:
            if(x == hour):
                time.sleep(1)
                await interface.next(State.opening)

    async def next(self, request):
        return Interface.opening

class Opening():
    async def run(self):
        Swilly.setup()
        Swilly.open()
        #Swilly.destroy()
        await interface.next(State.waiting)

    async def next(self, request):
        return Interface.waiting

class Waiting():
    async def run(self):
        seconds = giveMeYourArray.quantity / 10
        time.sleep(5)
        await interface.next(State.closing)

    async def next(self, request):
        return Interface.closing

class Closing():
    async def run(self):
        Swilly.setup()
        Swilly.close()
        Swilly.destroy()
        #exit()

class Interface(StateMachine):
    async def start(self):
        await StateMachine.start(self, Interface.checking)
        return self

    async def next(self, State):
        await StateMachine.next(self, State)

    async def getCurrentState(self):
        await StateMachine.getCurrentState(self)

interface=Interface()
Interface.waiting = Waiting()
Interface.checking = Checking()
Interface.closing = Closing()
Interface.opening = Opening()
asyncio.get_event_loop().run_until_complete(interface.start())
# asyncio.get_event_loop().run_forever()