#!/bin/bash

pins=(16 20 21)
delay=0.4

echo -e "EXPORT: \c"
for pin in "${pins[@]}"; do
	echo $pin > /sys/class/gpio/export
	echo -e "${pin} \c"
done; echo;

echo -e "DIRECTION: \c"
for pin in "${pins[@]}"; do
	echo out > /sys/class/gpio/gpio${pin}/direction
	echo -e "${pin} \c"
	sleep $delay
done; echo;
