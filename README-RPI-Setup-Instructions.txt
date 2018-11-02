Follow this video
https://www.youtube.com/watch?v=vzojwG7OB7c

Download Rpi desktop instead of lite (dont use swish use desktop)

php5 has no instilation candidate. Replace php5 with php

nameCheap set www and @ dynamic DNS (dollarPrime)


Updating Site:

Plug rpi into keyboard,mouse,monitor,ethernet

Load usb stick with website and plug into pi

Change to boot in desktop mode:
	sudo raspi-config
	3 Boot Options
	B1
	B4 Desktop AutoLogin

Finish and Reboot

Move Website files from usb Stick to desktop into folder called html(Media,Pi,USBSTICK)

Open Terminal:
	Remove existing files: sudo rm -r /var/www/html
	Move new files in    : sudo mv /home/pi/Desktop/html/ /var/www/
	sudo raspi-config
Change back to consol autologin:
	3 Boot Options
	B1
	Consol AutoLogin


Backup Drive after site is successfully  working.

#If getting 403 forbidden error reset the boot option to console auto login, the server probably cant login.
	sudo raspi-config
	boot Options
	Console auto login
	
