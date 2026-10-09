# Verify your Kenveil download

Every Kenveil installer is published with its SHA-256 checksum. If the checksum of your file matches
the one below **and** the one on [kenveil.com/download](https://kenveil.com/download#verify), you have
exactly the installer that was released, unchanged on the way to you. Two places to compare, so a
change in one of them would show.

## Published installers

| Version | File | Size | SHA-256 |
|---|---|---|---|
| 0.2.0 | `Kenveil_0.2.0_x64-setup.exe` | 11,262,490 bytes | `4814f3aecb2f5d9836688f0b074be5605598f32774ee0d25ab3c27db3376c962` |
| 0.1.0 | `Kenveil_0.1.0_x64-setup.exe` | 10,839,417 bytes | `785a162f5d8bc7b602cf587eb1709e243771cb16c8565be10af2cde8bf594afd` |

Download only from [kenveil.com/download](https://kenveil.com/download).

## How to check it on Windows

1. Open the folder you saved the installer to (usually **Downloads**).
2. Right-click an empty spot and choose **Open in Terminal** (Windows 10: hold Shift, right-click,
   **Open PowerShell window here**).
3. Run:

   ```powershell
   Get-FileHash .\Kenveil_0.2.0_x64-setup.exe -Algorithm SHA256
   ```

4. The **Hash** it prints must match the table above, letter for letter (capital or small letters
   don't matter). If it doesn't match, don't run the file: delete it, download it again, and tell us
   in the [Discord](https://discord.gg/2XQBGQDGMf).

The installer isn't code-signed yet, so Windows SmartScreen warns the first time you run it. Once the
checksum matches, choose **More info**, check the file name, then **Run anyway**.
