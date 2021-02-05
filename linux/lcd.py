#!/usr/bin/python3

from subprocess import Popen, PIPE, STDOUT
from datetime import datetime
import smbus
from time import sleep


def delay(time):
    sleep(time/1000.0)


def delayMicroseconds(time):
    sleep(time/1000000.0)


class Screen():

    enable_mask = 1 << 2
    rw_mask = 1 << 1
    rs_mask = 1 << 0
    backlight_mask = 1 << 3

    data_mask = 0x00

    def __init__(self, cols=16, rows=2, addr=0x77, bus=0):
        self.cols = cols
        self.rows = rows
        self.bus_num = bus
        self.bus = smbus.SMBus(self.bus_num)
        self.addr = addr
        self.display_init()

    def enable_backlight(self):
        self.data_mask = self.data_mask | self.backlight_mask

    def disable_backlight(self):
        self.data_mask = self.data_mask & ~self.backlight_mask

    def display_data(self, *args):
        self.clear()
        for line, arg in enumerate(args):
            self.cursorTo(line, 0)
            self.println(arg[:self.cols].ljust(self.cols))

    def cursorTo(self, row, col):
        offsets = [0x00, 0x40, 0x14, 0x54]
        self.command(0x80 | (offsets[row]+col))

    def clear(self):
        self.command(0x10)

    def println(self, line):
        for char in line:
            self.print_char(char)

    def print_char(self, char):
        char_code = ord(char)
        self.send(char_code, self.rs_mask)

    def display_init(self):
        delay(1.0)
        self.write4bits(0x30)
        delay(4.5)
        self.write4bits(0x30)
        delay(4.5)
        self.write4bits(0x30)
        delay(0.15)
        self.write4bits(0x20)
        self.command(0x20 | 0x08)
        self.command(0x04 | 0x08, delay=80.0)
        self.clear()
        self.command(0x04 | 0x02)
        delay(3)

    def command(self, value, delay=50.0):
        self.send(value, 0)
        delayMicroseconds(delay)

    def send(self, data, mode):
        self.write4bits((data & 0xF0) | mode)
        self.write4bits((data << 4) | mode)

    def write4bits(self, value):
        value = value & ~self.enable_mask
        self.expanderWrite(value)
        self.expanderWrite(value | self.enable_mask)
        self.expanderWrite(value)

    def expanderWrite(self, data):
        self.bus.write_byte_data(self.addr, 0, data | self.data_mask)


# ---------------------------------------------------
# looking for an active Ethernet or WiFi device
def find_interface():
    find_device = "ip addr show"
    interface_parse = run_cmd(find_device)
    for line in interface_parse.splitlines():
        if "state UP" in line:
            dev_name = line.split(':')[1]
    return dev_name

# find an active IP on the first LIVE network device
def parse_ip():
    find_ip = "ip addr show %s" % interface
    find_ip = "ip addr show %s" % interface
    ip_parse = run_cmd(find_ip)
    for line in ip_parse.splitlines():
        if "inet " in line:
            ip = line.split(' ')[5]
            ip = ip.split('/')[0]
    return ip

# run unix shell command, return as ASCII
def run_cmd(cmd):
    p = Popen(cmd, shell=True, stdout=PIPE)
    output = p.communicate()[0]
    return output.decode('ascii')
# ---------------------------------------------------

# ---------------------------------------------------
def link_detect():
    cmd = "ethtool eth0 | grep detect | awk '{print $3}' | tr -d '\n'"
    ps = Popen(cmd, shell=True, stdout=PIPE, stderr=STDOUT)
    output = ps.communicate()[0]
    return output.decode('ascii')
# ---------------------------------------------------

outlets = {
    1: {
        'name': 'server',
        'pin': 2,
        'value': None,
    },
    2: {
        'name': 'desktop',
        'pin': 10,
        'value': None,
    },
    3: {
        'name': 'printer',
        'pin': 18,
        'value': None,
    }
}

# ---------------------------------------------------
def gpio_read():
    for out in outlets:
        pin = outlets[out]['pin']
        filepath = "/sys/class/gpio/gpio" + str(pin) + "/value"
        f = open(filepath, "r")
        value = f.read()
        outlets[out]['value'] = "OFF" if int(value) > 0 else "ON"
    return outlets
# ---------------------------------------------------

# ---------------------------------------------------
def get_temp():
    tfilepath = "/sys/devices/virtual/thermal/thermal_zone0/temp"
    tf = open(tfilepath, "r")
    tvalue = tf.read()
    return str(str(int(str(tvalue)[:2])) + chr(222) + "C")
# ---------------------------------------------------

if __name__ == "__main__":
    screen = Screen(bus=0, addr=0x27, cols=16, rows=2)
    screen.enable_backlight()
    while True:

        gpio_read()
        out1 = outlets[1]['value']
        out2 = outlets[2]['value']
        out3 = outlets[3]['value']
        link = str(link_detect())
        interface = find_interface()
        ip_address = parse_ip()
        temp = get_temp()

        screen_1_line_1 = "Ethernet:" + link
        screen_1_line_2 = "IP:" + ip_address
        screen.display_data(screen_1_line_1, screen_1_line_2)
        sleep(2)

        screen_2_line_1 = "Outlets:"
        screen_2_line_2 = out1 + " " + out2 + " " + out3
        screen.display_data(screen_2_line_1, screen_2_line_2)
        sleep(2)

        screen_3_line_1 = "Tempature: " + temp
        screen_3_line_2 = temp
        screen.display_data(screen_3_line_1, screen_3_line_2)
        sleep(2)
