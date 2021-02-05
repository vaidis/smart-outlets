#!/bin/bash

pins=(16 20 21)
delay=0.4

echo -e "VALUE 1: \c"
for pin in "${pins[@]}"; do
	echo 1 >  /sys/class/gpio/gpio${pin}/value
	echo -e "${pin} \c"
	sleep $delay
done; echo;

echo -e "UNEXPORT: \c"
for pin in "${pins[@]}"; do
	echo $pin > /sys/class/gpio/unexport
	echo -e "${pin} \c"
done; echo
