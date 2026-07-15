# Digital Level 3 — Web App

**Version 1.4** · 2026-07-15 · ADXL355 · Arduino Nano ESP32 · BLE Nordic UART

## Files
- `index.html` — the app (v1.4). Changelog is in an HTML comment at the top of the file.
- `manifest.json` — PWA manifest.
- `sw.js` — service worker. Cache name bumped to `dl3-v1.4` in this release —
  see the comment at the top of the file for why that matters.

## What changed in v1.4
Fixed a bug where tapping **Tare to Current Position** while connected would
briefly show 0.00° and then jump to the *negative* of the pre-tare reading —
including the LEVEL badge — instead of settling at zero. Full root-cause
writeup is in the comment block at the top of `index.html`.

## Known gap
`icons/icon-192.png` and `icons/icon-512.png` are referenced by
`manifest.json` and `sw.js` but were never provided, so this package does not
include an `icons/` folder. Add your own before deploying, or the service
worker's install step (`caches.addAll`) will fail.

## Firmware
No Arduino firmware is included in this package — the firmware provided so
far (`DigitalLevel_Firmware_v2.5.ino`) is written for MPU-6050, not ADXL355,
so it belongs with the Digital Level 2 package instead. If Digital Level 3
hardware also actually runs MPU-6050 firmware in reality (i.e. the "ADXL355"
in this app's UI text is outdated), let me know and I'll reconcile the two.
