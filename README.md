# 📶 IFTTT Bluetooth Proximity

A script to add Bluetooth proximity detection to IFTTT flows (using an IFTTT webhook). As this uses `hcitool`, it **does not** work on Windows or macOS.

## Usage

Environment variables:

- `IFTTT_TOKEN`: the webhook token
- `KNOWN_DEVICES`: the MAC addresses of Bluetooth devices you want to sense, seperated by commas
- `INTERVAL_SECONDS`: (optional, default **5**) the interval in seconds between scans
- `AT_LEAST_1_EVENT`: (optional, default **someone_home**) the IFTTT event that's emitted when at least one device is nearby
- `AT_MOST_0_EVENT`: (optional, default **everyone_gone**) the IFTTT event that's emitted when all devices are not found

Example run command:

```shell
docker run -d \\
--name bluetooth-proximity \\
--privileged \\
--net=host \\
--restart always \\
codetheweb/ifttt-bluetooth-proximity
```