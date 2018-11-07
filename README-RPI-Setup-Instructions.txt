First time setup:
	Follow this video
	https://www.youtube.com/watch?v=vzojwG7OB7c
	Notes on video tutorial:
		Download raspberry pi desktop instead of lite (don't use swish use desktop)
		php5 has no installation candidate. Replace php5 with php
		nameCheap set www and @ dynamic DNS


Updating Site:

1.Plug raspberry pi into keyboard, mouse, monitor
2.Load USB stick with website and plug into pi
3.Change to boot in desktop mode:
	i)   sudo raspi-config
	ii)  3 Boot Options
	iii) B1
	iv)  B4 Desktop Autologin
4.Finish and Reboot
5.Move Website files from USB Stick to desktop into folder called html(/media/pi/USB-stick-name/)
6.Open Terminal:
	i)   Remove existing files: sudo rm -r /var/www/html
	ii)  Move new files in    : sudo mv /home/pi/Desktop/html/ /var/www/
	iii) sudo raspi-config
				Change back to console autologin:
					iv)	3 Boot Options
					v)	B1
					vi)	Console Autologin
7.sudo reboot

Alternative Site update method:
	cd /home/pi/Desktop/Resume-Website
	git pull https://github.com/Colin-L/Resume-Website.git
	sudo rm -r /var/www/html/*
	sudo mv -v /Resume-Website/* /var/www/html/
	sudo reboot


Error Handling:

403 forbidden error:
	Reset the boot option to console auto login, the server probably cant login.
		sudo raspi-config
		boot Options
		Console auto login
