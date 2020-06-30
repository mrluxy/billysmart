#!/usr/bin/env python

# WS server example
import RPi.GPIO as GPIO
import datetime
import time
from state import State
import SweepReservoir as Swilly
import asyncio
import websockets

connected = set()

async def Opening():
        Swilly.setup()
        Swilly.open()
        #Swilly.destroy()

async def Waiting():
        time.sleep(5)

async def Closing():
        Swilly.setup()
        Swilly.close()
        Swilly.destroy()

async def demo(websocket, path):
    global connected
    if path == '/broadcast/read' :
        connected.add(websocket)
        print("READER "+str(websocket.remote_address)+"    connected")
        while True:
            await asyncio.sleep(100)
    elif path == '/broadcast/write' :
        print("WRITER "+str(websocket.remote_address)+"    connected")
        try :
            while True:
                data = await websocket.recv()
                print("MULTICAST: "+data)
                if data == 'verser':
                    await Opening()
                    #await Waiting()
                    #await Closing()
                still_connected = set()
                for ws in connected :
                    if ws.open:
                        still_connected.add(ws)
                        await asyncio.wait([ws.send(data)])
                    else:
                        print("READER "+str(ws.remote_address)+" disconnected")
                connected=still_connected
        except:
            print("WRITER "+str(websocket.remote_address)+" disconnected")
    #await Opening()
    #await Waiting()
    #await Closing()


start_server = websockets.serve(demo, "192.168.1.114", 8765)
asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()