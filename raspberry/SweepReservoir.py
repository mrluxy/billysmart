#!/usr/bin/env python3
########################################################################
# Filename    : Sweep.py
# Description : Servo sweep
# Author      : www.freenove.com
# modification: 2019/12/27
########################################################################
import RPi.GPIO as GPIO
import time

OFFSE_DUTY = 0.5        #define pulse offset of servo
SERVO_MIN_DUTY = 2.5+OFFSE_DUTY     #define pulse duty cycle for minimum angle of servo
SERVO_MAX_DUTY = 12.5+OFFSE_DUTY    #define pulse duty cycle for maximum angle of servo
servoPin = 12

def map( value, fromLow, fromHigh, toLow, toHigh):  # map a value from one range to another range
    return (toHigh-toLow)*(value-fromLow) / (fromHigh-fromLow) + toLow

def setup():
    global p
    GPIO.setmode(GPIO.BOARD)         # use PHYSICAL GPIO Numbering
    GPIO.setup(servoPin, GPIO.OUT)   # Set servoPin to OUTPUT mode
    GPIO.output(servoPin, GPIO.LOW)  # Make servoPin output LOW level

    p = GPIO.PWM(servoPin, 50)     # set Frequece to 50Hz
    p.start(0)                     # Set initial Duty Cycle to 0

def destroy():
    p.stop()
    GPIO.cleanup()

def servoWrite(angle):# make the servo rotate to specific angle, 0-180
    if(angle < 0):
        angle = 0
    elif(angle > 210):
        angle = 210
    p.ChangeDutyCycle(map(angle,0,210,SERVO_MIN_DUTY,SERVO_MAX_DUTY))

def open():
    for dc in range(0, 210, 1):   # make servo rotate from 0 to 180 deg
        print(dc)
        servoWrite(dc)     # Write dc value to servo
        time.sleep(0.01)
    destroy()



def close():
    for dc in range(210, 0, -1):   # make servo rotate from 0 to 180 deg
        print(dc)
        servoWrite(dc)     # Write dc value to servo
        time.sleep(0.01)
    destroy()

def destroy():
    p.stop()
    GPIO.cleanup()

if __name__ == '__main__':     # Program entrance
    print ('Program is starting...')
    setup()
    try:
        open()
    except KeyboardInterrupt:  # Press ctrl-c to end the program.
        destroy()