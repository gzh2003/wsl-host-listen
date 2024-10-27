# wsl-host-listen

![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)
![PNPM](https://img.shields.io/badge/pnpm-%234a4a4a.svg?style=for-the-badge&logo=pnpm&logoColor=f69220)
![Yarn](https://img.shields.io/badge/yarn-%232C8EBB.svg?style=for-the-badge&logo=yarn&logoColor=white)

## Description

`wsl-host-listen` is a utility designed to enable access to Windows Subsystem for Linux (WSL) from
local area networks.

This tool streamlines the installation process of
[wslhostpatcher](https://github.com/czbix/wslhostpatcher).

## Usage

To use `wsl-host-listen`, you can execute it via npm:

```sh
npx wsl-host-listen
```

**Note:** This command needs to be re-run for each new WSL instance.

## Recommendations

This tool is intended as a quick and easy workaround, but it's important to consider more permanent
solutions.

If your setup allows for it consider using `netsh` to add a port proxy:

```
netsh interface portproxy add v4tov4 listenport=<yourPortToForward> listenaddress=0.0.0.0 connectport=<yourPortToConnectToInWSL> connectaddress=(wsl hostname -I)
```

For more information, check out the
[Microsoft documentation](https://learn.microsoft.com/en-us/windows/wsl/networking#accessing-a-wsl-2-distribution-from-your-local-area-network-lan).
Alternatively you can set up
[mirrored mode networking](https://learn.microsoft.com/en-us/windows/wsl/networking#mirrored-mode-networking).
