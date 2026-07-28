# BDU Kiosk — Linux Mint Qurulum Bələdçisi

Təmiz quraşdırılmış Linux Mint üzərində kompüter açılan kimi
`bdu-kiosk` layihəsinin brauzerdə tam ekran açılması üçün addım-addım təlimat.

**Nəticə:** Düyməyə basırsan → PC açılır → parol soruşmur → masaüstü görünmür →
birbaşa tam ekran sayt açılır.

---

## Bu sənəddə istifadə olunan fərziyyələr

| Nə | Dəyər |
|---|---|
| OS | Linux Mint 22.x (XFCE) |
| Layihə qovluğu | `~/bdu-kiosk` |
| Server portu | `8000` |
| Brauzer | Chromium |
| İstifadəçi adı | `$USER` (əmrlər avtomatik əvəz edir, əl ilə yazma) |

> Terminalı açmaq üçün: **Ctrl + Alt + T**

---

## Addım 0 — Sistemi yenilə

```bash
sudo apt update && sudo apt upgrade -y
```

İnternet Wi-Fi ilədirsə, əvvəlcə sağ aşağıdakı şəbəkə ikonundan qoşul.

---

## Addım 1 — Lazımi paketləri qur

```bash
sudo apt install -y git chromium unclutter-xfixes
```

Nə üçün:

- `git` — layihəni gətirmək və sonra yeniləmək üçün
- `chromium` — kiosk rejimi üçün brauzer
- `unclutter-xfixes` — hərəkətsizlikdə siçan kursorunu gizlədir (kiosk üçün vacibdir)

`python3` Mint-də hazır gəlir, ayrıca quraşdırmaq lazım deyil. Yoxlamaq üçün:

```bash
python3 --version
```

> **Qeyd:** `chromium` tapılmasa, `sudo apt install -y chromium-browser` sına.
> Paketin adı Mint versiyasına görə dəyişə bilər.

---

## Addım 2 — Layihəni gətir

```bash
cd ~
git clone https://github.com/AliAghayev132/bdu-kiosk.git
```

Layihə `~/bdu-kiosk` qovluğuna düşəcək. Təxminən 85 MB-dır, bir neçə dəqiqə çəkə bilər.

**Vacib:** Repo-nun default branch-i `main` deyil, **`support`**-dur.
`git clone` avtomatik onu götürür, amma yoxlamaq istəsən:

```bash
cd ~/bdu-kiosk
git branch
```

Cavab `* support` olmalıdır.

### İnternet yoxdursa (USB ilə köçürmə)

Layihəni USB-yə atıb gətirmisənsə:

```bash
mkdir -p ~/bdu-kiosk
cp -r /media/$USER/USB_ADI/bdu-kiosk/* ~/bdu-kiosk/
```

### Yoxla ki, düzgün yerdədir

```bash
ls ~/bdu-kiosk/index.html
```

Fayl yolu çap olunursa, hər şey qaydasındadır. `No such file` yazırsa,
qovluq quruluşu səhvdir — `ls ~/bdu-kiosk` ilə içəri bax.

---

## Addım 3 — Serveri əl ilə test et

Avtomatlaşdırmadan **əvvəl** işlədiyinə əmin ol.

```bash
cd ~/bdu-kiosk
python3 -m http.server 8000
```

Brauzeri aç, `http://localhost:8000` ünvanına get. Sayt görünməlidir.

Test bitəndə terminalda **Ctrl + C** ilə serveri dayandır.

> **Niyə server lazımdır?** Layihədə `js/i18n.js` tərcümələri `fetch()` ilə
> yükləyir. Faylı birbaşa `file://` ilə açsan, brauzer CORS səbəbindən bunu
> bloklayır və sayt tərcüməsiz/xarab görünür. Server məcburidir.

---

## Addım 4 — Serveri avtomatik xidmətə çevir

Bu yolun üstünlüyü: server çökərsə sistem onu özü yenidən qaldırır.

### 4.1 — Xidmət faylını yarat

```bash
mkdir -p ~/.config/systemd/user
nano ~/.config/systemd/user/bdu-kiosk.service
```

Aşağıdakını olduğu kimi yapışdır (`%h` avtomatik ev qovluğuna çevrilir,
istifadəçi adını yazmağa ehtiyac yoxdur):

```ini
[Unit]
Description=BDU Kiosk static web server
After=network.target

[Service]
Type=simple
WorkingDirectory=%h/bdu-kiosk
ExecStart=/usr/bin/python3 -m http.server 8000 --bind 127.0.0.1
Restart=always
RestartSec=3

[Install]
WantedBy=default.target
```

**nano-da yadda saxlamaq:** `Ctrl + O` → `Enter` → `Ctrl + X`

### 4.2 — Xidməti işə sal

```bash
systemctl --user daemon-reload
systemctl --user enable --now bdu-kiosk.service
```

### 4.3 — Login olmadan da işləməsi üçün

```bash
sudo loginctl enable-linger $USER
```

> **Bunu buraxma.** Bu əmr olmadan xidmət yalnız sən login etdikdən sonra
> başlayır. Kiosk avtologin ilə işləyəcəyi üçün adətən problem çıxmır,
> amma bu sətir işi zəmanətli edir.

### 4.4 — Yoxla

```bash
systemctl --user status bdu-kiosk.service
```

Yaşıl rəngdə **`active (running)`** görməlisən. Çıxmaq üçün `q`.

---

## Addım 5 — Brauzeri kiosk rejimində avtomatik aç

### 5.1 — Başlatma skriptini yarat

```bash
nano ~/kiosk-start.sh
```

İçinə:

```bash
#!/bin/bash

# Ekranın sönməsinin və screensaver-in qarşısını al
xset s off
xset s noblank
xset -dpms

# Hərəkətsizlikdə kursoru gizlət (paketin adı sistemdən asılı olaraq dəyişir)
if command -v unclutter-xfixes >/dev/null 2>&1; then
    unclutter-xfixes --timeout 3 --fork
elif command -v unclutter >/dev/null 2>&1; then
    unclutter -idle 3 -root &
fi

# Server qalxana qədər gözlə (maksimum 30 saniyə)
for i in $(seq 1 30); do
    if (echo > /dev/tcp/127.0.0.1/8000) >/dev/null 2>&1; then
        break
    fi
    sleep 1
done

# Chromium-un "düzgün bağlanmadı" xəbərdarlığını təmizlə
PREF="$HOME/.config/chromium/Default/Preferences"
if [ -f "$PREF" ]; then
    sed -i 's/"exit_type":"Crashed"/"exit_type":"Normal"/' "$PREF"
    sed -i 's/"exited_cleanly":false/"exited_cleanly":true/' "$PREF"
fi

# Kiosk rejimində aç
chromium \
    --kiosk \
    --start-fullscreen \
    --noerrdialogs \
    --disable-infobars \
    --disable-session-crashed-bubble \
    --disable-features=TranslateUI \
    --disable-pinch \
    --overscroll-history-navigation=0 \
    --autoplay-policy=no-user-gesture-required \
    --check-for-update-interval=31536000 \
    --password-store=basic \
    http://localhost:8000
```

Yadda saxla (`Ctrl+O`, `Enter`, `Ctrl+X`), sonra icra icazəsi ver:

```bash
chmod +x ~/kiosk-start.sh
```

### Bayraqlar nə edir

| Bayraq | Nə üçün |
|---|---|
| `--kiosk` | Tam ekran, ünvan sətri və düymələr yoxdur |
| `--noerrdialogs` | Xəta pəncərələri çıxmır |
| `--disable-infobars` | "Chromium avtomatlaşdırılır" zolağını gizlədir |
| `--disable-session-crashed-bubble` | "Səhifələri bərpa et?" sualını söndürür |
| `--disable-pinch` | Toxunma ekranda barmaqla zoom-u bloklayır |
| `--overscroll-history-navigation=0` | Sağa sürüşdürəndə geri getməni bloklayır |
| `--autoplay-policy=...` | Videoların avtomatik oynamasını təmin edir |
| `--check-for-update-interval` | Yeniləmə bildirişlərini susdurur |

### 5.2 — Skripti autostart-a əlavə et

```bash
mkdir -p ~/.config/autostart
nano ~/.config/autostart/bdu-kiosk.desktop
```

İçinə:

```ini
[Desktop Entry]
Type=Application
Name=BDU Kiosk
Exec=/bin/bash -c "$HOME/kiosk-start.sh"
X-GNOME-Autostart-enabled=true
Terminal=false
```

Yadda saxla.

---

## Addım 6 — Avtologin

Parol ekranını keçmək üçün:

**Menu → Login Window → Users** bölməsi →
**Automatic login** aktivləşdir və istifadəçini seç.

Parol soruşacaq (admin təsdiqi üçün) — öz parolunu yaz.

> Terminaldan etmək istəsən:
> ```bash
> sudo nano /etc/lightdm/lightdm.conf
> ```
> `[Seat:*]` bölməsinə əlavə et (istifadəçi adını öz adınla əvəz et):
> ```
> autologin-user=ISTIFADECI_ADI
> autologin-user-timeout=0
> ```

---

## Addım 7 — Ekran söndürmə və screensaver-i tam söndür

Skriptdəki `xset` sətirləri əsas işi görür, amma XFCE öz parametrləri ilə
onları üstələyə bilər. Ona görə interfeysdən də söndür:

**Menu → Power Manager → Display** bölməsi:

- *Blank after* → **Never**
- *Put to sleep after* → **Never**
- *Switch off after* → **Never**

**Menu → Screensaver:**

- *Enable Screensaver* → **söndür**
- *Lock Screen* → **söndür**

Terminaldan alternativ:

```bash
xfconf-query -c xfce4-power-manager -p /xfce4-power-manager/dpms-enabled -s false
xfconf-query -c xfce4-screensaver -p /saver/enabled -s false
xfconf-query -c xfce4-screensaver -p /lock/enabled -s false
```

---

## Addım 8 — Test et

Yenidən başlat:

```bash
sudo reboot
```

Gözlənilən nəticə: PC açılır → parol soruşmur → masaüstü bir anlıq görünür →
Chromium tam ekranda saytı açır.

---

## Kiosk-dan necə çıxmaq olar

Sayt açıq qalanda kompüterə müdaxilə etmək lazım olsa:

| Üsul | Nə edir |
|---|---|
| `Alt + F4` | Chromium-u bağlayır, masaüstünə düşürsən |
| `Ctrl + Alt + F2` | Ayrı mətn terminalına keçir (geri: `Ctrl + Alt + F7`) |
| `Ctrl + Alt + T` | Kiosk-un arxasında terminal açır |

**Kiosk-u müvəqqəti söndürmək** (növbəti açılışda avtomatik başlamasın):

```bash
mv ~/.config/autostart/bdu-kiosk.desktop ~/bdu-kiosk.desktop.bak
```

Geri qaytarmaq:

```bash
mv ~/bdu-kiosk.desktop.bak ~/.config/autostart/bdu-kiosk.desktop
```

---

## Layihəni yeniləmək

Kodda dəyişiklik edib GitHub-a göndərdikdən sonra kioskda:

```bash
cd ~/bdu-kiosk
git pull
systemctl --user restart bdu-kiosk.service
```

Sonra brauzeri yenilə: `Ctrl + Shift + R` (kəşi keçərək tam yeniləmə).

Ya da sadəcə `sudo reboot`.

---

## Problem həlli

### Chromium açılır, amma "This site can't be reached" yazır

Server qalxmayıb. Yoxla:

```bash
systemctl --user status bdu-kiosk.service
journalctl --user -u bdu-kiosk.service -n 50 --no-pager
```

Ən çox rast gəlinən səbəb: `WorkingDirectory` yolu səhvdir.
`~/bdu-kiosk` qovluğunun həqiqətən mövcud olduğuna əmin ol.

### Sayt açılır, amma yazılar tərcümə olunmur / boş görünür

`fetch()` işləmir. Brauzerdə `http://localhost:8000` yazdığından
(`file://` deyil) əmin ol. Bu qurulumda avtomatik düzgündür.

### Videolar oynamır

Kodek çatışmır:

```bash
sudo apt install -y ubuntu-restricted-extras
```

Quraşdırma zamanı lisenziya ekranı çıxarsa, `Tab` ilə **OK**-a keçib `Enter`.

### Brauzer açılır, amma tam ekran deyil

`--kiosk` bayrağının skriptdə olduğunu yoxla. Skript düzgündürsə,
XFCE-nin pəncərə menecerində problem ola bilər — səhifədə `F11` bas.
(Layihənin `kiosk-security.js` faylı F11-i idarə edir.)

### Kursor ekranda qalır

Skript hər iki paket variantını avtomatik yoxlayır, amma heç biri
quraşdırılmayıbsa işləməyəcək. Yoxla:

```bash
command -v unclutter-xfixes || command -v unclutter || echo "heç biri yoxdur"
```

"heç biri yoxdur" çıxırsa:

```bash
sudo apt install -y unclutter-xfixes || sudo apt install -y unclutter
```

### Ekran bir müddət sonra sönür

Addım 7-ni tam et. XFCE-nin Power Manager parametri `xset`-i üstələyir.

### Hər şey qarışdı, sıfırdan başlamaq istəyirəm

```bash
systemctl --user disable --now bdu-kiosk.service
rm ~/.config/systemd/user/bdu-kiosk.service
rm ~/.config/autostart/bdu-kiosk.desktop
rm ~/kiosk-start.sh
systemctl --user daemon-reload
```

Sonra Addım 4-dən yenidən başla.

---

## Faydalı əmrlər

```bash
# Server statusu
systemctl --user status bdu-kiosk.service

# Serveri yenidən başlat
systemctl --user restart bdu-kiosk.service

# Server loglarını canlı izlə
journalctl --user -u bdu-kiosk.service -f

# 8000 portunu kim tutub
ss -tlnp | grep 8000

# Chromium-u əl ilə kiosk rejimində sına
~/kiosk-start.sh
```

---

## Qurulumun quruluşu

```
~/bdu-kiosk/                              ← layihə faylları (git repo)
~/kiosk-start.sh                          ← brauzeri açan skript
~/.config/systemd/user/bdu-kiosk.service  ← serveri işə salan xidmət
~/.config/autostart/bdu-kiosk.desktop     ← skripti autostart-a bağlayır
```

Açılış ardıcıllığı:

```
PC açılır
   ↓
avtologin (Addım 6)
   ↓
systemd xidməti → python3 http.server :8000   (Addım 4)
   ↓
autostart .desktop → kiosk-start.sh           (Addım 5)
   ↓
xset + unclutter → server gözlənilir → chromium --kiosk
   ↓
Tam ekran sayt
```
