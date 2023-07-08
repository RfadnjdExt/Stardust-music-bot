const fs = require("fs");

const filePath = "config.sample.js";

if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, Buffer.from('bW9kdWxlLmV4cG9ydHMgPSB7CiAgICBUT0tFTjogIiIsCiAgICBvd25lcklEOiBbIiJdLCAvL3dyaXRlIHlvdXIgZGlzY29yZCB1c2VyIGlkLiBleGFtcGxlOiBbImlkIl0gb3IgWyJpZDEiLCJpZDIiXQogICAgYm90SW52aXRlOiAiIiwgLy93cml0ZSB5b3VyIGRpc2NvcmQgYm90IGludml0ZS4KICAgIHN1cHBvcnRTZXJ2ZXI6ICIiLCAvL3dyaXRlIHlvdXIgZGlzY29yZCBib3Qgc3VwcG9ydCBzZXJ2ZXIgaW52aXRlLgogICAgbW9uZ29kYlVSTDogIiIsIC8vd3JpdGUgeW91ciBtb25nb2RiIHVybC4KICAgIHN0YXR1czogIiIsCiAgICBjb21tYW5kc0RpcjogIi4vY29tbWFuZHMiLCAvL1BsZWFzZSBkb24ndCB0b3VjaAogICAgbGFuZ3VhZ2U6ICJpZCIsIC8vZW4sIHRyLCBubCwgcHQsIGZyLCBhciwgemhfVFcsIGl0LCBpZCwgamEKICAgIGVtYmVkQ29sb3I6ICJmZmE5NTQiLCAvL2hleCBjb2xvciBjb2RlCiAgICBlcnJvckxvZzogIiIsIC8vd3JpdGUgeW91ciBkaXNjb3JkIGVycm9yIGxvZyBjaGFubmVsIGlkLgogICAgZWRpdGVkQ2hhbm5lbElkOiAiIiwgLy9mb3IgbG9ncwogICAgZGVsZXRlZENoYW5uZWxJZDogIiIsIC8vZm9yIGxvZ3MKCiAgICBzcG9uc29yOiB7CiAgICAgICAgc3RhdHVzOiB0cnVlLCAvL3RydWUgb3IgZmFsc2UKICAgICAgICB1cmw6ICIiIC8vd3JpdGUgeW91ciBkaXNjb3JkIHNwb25zb3IgdXJsLgogICAgfSwKCiAgICB2b3RlTWFuYWdlcjogewogICAgICAgIC8vb3B0aW9uYWwKICAgICAgICBzdGF0dXM6IGZhbHNlLCAvL3RydWUgb3IgZmFsc2UKICAgICAgICBhcGlfa2V5OiAiIiwgLy93cml0ZSB5b3VyIHRvcC5nZyBhcGkga2V5LgogICAgICAgIHZvdGVfY29tbWFuZHM6IFsKICAgICAgICAgICAgImJhY2siLAogICAgICAgICAgICAiY2hhbm5lbCIsCiAgICAgICAgICAgICJjbGVhciIsCiAgICAgICAgICAgICJkaiIsCiAgICAgICAgICAgICJmaWx0ZXIiLAogICAgICAgICAgICAibG9vcCIsCiAgICAgICAgICAgICJub3dwbGF5aW5nIiwKICAgICAgICAgICAgInBhdXNlIiwKICAgICAgICAgICAgInBsYXkiLAogICAgICAgICAgICAicGxheWxpc3QiLAogICAgICAgICAgICAicXVldWUiLAogICAgICAgICAgICAicmVzdW1lIiwKICAgICAgICAgICAgInNhdmUiLAogICAgICAgICAgICAic2VhcmNoIiwKICAgICAgICAgICAgInNraXAiLAogICAgICAgICAgICAic3RvcCIsCiAgICAgICAgICAgICJ0aW1lIiwKICAgICAgICAgICAgInZvbHVtZSIKICAgICAgICBdLCAvL3dyaXRlIHlvdXIgdXNlIGJ5IHZvdGUgY29tbWFuZHMuCiAgICAgICAgdm90ZV91cmw6ICIiIC8vd3JpdGUgeW91ciB0b3AuZ2cgdm90ZSB1cmwuCiAgICB9LAoKICAgIHNoYXJkTWFuYWdlcjogewogICAgICAgIHNoYXJkU3RhdHVzOiBmYWxzZSAvL0lmIHlvdXIgYm90IGV4aXN0cyBvbiBtb3JlIHRoYW4gMTAwMCBzZXJ2ZXJzLCBjaGFuZ2UgdGhpcyBwYXJ0IHRvIHRydWUuCiAgICB9LAoKICAgIHBsYXlsaXN0U2V0dGluZ3M6IHsKICAgICAgICBtYXhQbGF5bGlzdDogMTAsIC8vbWF4IHBsYXlsaXN0IGNvdW50CiAgICAgICAgbWF4TXVzaWM6IDc1IC8vbWF4IG11c2ljIGNvdW50CiAgICB9LAoKICAgIG9wdDogewogICAgICAgIERKOiB7CiAgICAgICAgICAgIGNvbW1hbmRzOiBbImJhY2siLCAiY2xlYXIiLCAiZmlsdGVyIiwgImxvb3AiLCAicGF1c2UiLCAicmVzdW1lIiwgInNraXAiLCAic3RvcCIsICJ2b2x1bWUiLCAic2h1ZmZsZSJdIC8vUGxlYXNlIGRvbid0IHRvdWNoCiAgICAgICAgfSwKCiAgICAgICAgdm9pY2VDb25maWc6IHsKICAgICAgICAgICAgbGVhdmVPbkZpbmlzaDogZmFsc2UsIC8vSWYgdGhpcyB2YXJpYWJsZSBpcyAidHJ1ZSIsIHRoZSBib3Qgd2lsbCBsZWF2ZSB0aGUgY2hhbm5lbCB0aGUgbXVzaWMgZW5kcy4KICAgICAgICAgICAgbGVhdmVPblN0b3A6IGZhbHNlLCAvL0lmIHRoaXMgdmFyaWFibGUgaXMgInRydWUiLCB0aGUgYm90IHdpbGwgbGVhdmUgdGhlIGNoYW5uZWwgd2hlbiB0aGUgbXVzaWMgaXMgc3RvcHBlZC4KCiAgICAgICAgICAgIGxlYXZlT25FbXB0eTogewogICAgICAgICAgICAgICAgLy9UaGUgbGVhdmVPbkVuZCB2YXJpYWJsZSBtdXN0IGJlICJmYWxzZSIgdG8gdXNlIHRoaXMgc3lzdGVtLgogICAgICAgICAgICAgICAgc3RhdHVzOiB0cnVlLCAvL0lmIHRoaXMgdmFyaWFibGUgaXMgInRydWUiLCB0aGUgYm90IHdpbGwgbGVhdmUgdGhlIGNoYW5uZWwgd2hlbiB0aGUgYm90IGlzIG9mZmxpbmUuCiAgICAgICAgICAgICAgICBjb29sZG93bjogMTAwMDAwMDAgLy8xMDAwID0gMSBzZWNvbmQKICAgICAgICAgICAgfQogICAgICAgIH0sCgogICAgICAgIG1heFZvbDogMTUwIC8vWW91IGNhbiBzcGVjaWZ5IHRoZSBtYXhpbXVtIHZvbHVtZSBsZXZlbC4KICAgIH0KfTsK', 'base64'))
}
