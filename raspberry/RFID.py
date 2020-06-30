#!/usr/bin/env python
########################################################################
# Filename    : RFID.py
# Description : Use MFRC522 read and write Mifare Card.
# auther      : www.freenove.com
# modification: 2018/09/08
########################################################################
import RPi.GPIO as GPIO
import MFRC522

# Create an object of the class MFRC522
mfrc = MFRC522.MFRC522()

def setup():
	print("Program is starting ... ")	
	print("Press Ctrl-C to exit.")
	pass
	
def loop():
    global mfrc
    isScan = True
    while isScan:
        print("Scanning...")
        mfrc = MFRC522.MFRC522()
        # Scan for cards
        (status,TagType) = mfrc.MFRC522_Request(mfrc.PICC_REQIDL)
        # If a card is found
        if status == mfrc.MI_OK:
            print("Card detected")
        # Get the UID of the card
        (status,uid) = mfrc.MFRC522_Anticoll()	
        # If we have the UID, continue
        if status == mfrc.MI_OK:
            cardID = "%2X%2X%2X%2X%2X"%(uid[0],uid[1],uid[2],uid[3],uid[4])
            print(cardID)
            isScan = False
            print("REQUETE")
            destroy()
				
def destroy():
	GPIO.cleanup()

if __name__ == "__main__":
	setup()
	try:
		loop()
	except KeyboardInterrupt:  # Ctrl+C captured, exit
		destroy()

	