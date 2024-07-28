/**
 * Creates a readable stream of a raw email message from a plain text message.
 * If no plain message is provided, it uses a sample message.
 * @param {string | null} plainMessage - The plain text message to be converted into a stream.
 * @returns {ReadableStream<Uint8Array>} - A readable stream of the encoded email message.
 */
export function getRawMessage(plainMessage: string | null = null): ReadableStream<Uint8Array> {
    // Get the message to encode, either from the provided plain message or a sample message
    const sampleMessage = !plainMessage ? getSampleMessage() : plainMessage
    const encoder = new TextEncoder() // Create a TextEncoder for UTF-8 encoding
    const bodyUint8Array = encoder.encode(sampleMessage) // Encode the message into a Uint8Array

    // Create a new readable stream containing the encoded message
    const rawMessage = new ReadableStream<Uint8Array>({
        start(controller) {
            controller.enqueue(bodyUint8Array) // Enqueue the encoded message
            controller.close() // Close the stream
        }
    })

    return rawMessage // Return the readable stream
}

export function getSampleMessage(): string {
    return `Delivered-To: recipient@example.com
Received: by 2002:a05:7412:7101:b0:11b:9a84:cdb6 with SMTP id bt1csp297729rdb;
        Tue, 16 Jul 2024 06:32:07 -0700 (PDT)
X-Google-Smtp-Source: AGHT+IFytwBEEHe9+C6MnEvveB0lvL1XXHYKlVuwufxcpAe5rGkrHMc0h88zzsAvpQSffId08LgE
X-Received: by 2002:a05:6122:1350:b0:4e4:e90f:6749 with SMTP id 71dfb90a1353d-4f4d72212dfmr950171e0c.10.1721136727565;
        Tue, 16 Jul 2024 06:32:07 -0700 (PDT)
ARC-Seal: i=1; a=rsa-sha256; t=1721136727; cv=none;
        d=google.com; s=arc-20160816;
        b=sP+ef6tT7nBYm7nnQRNRmSW6H4QXhPAHa4rOxFPQunZhkpQjkn+P9rB0vMrv4UfBox
         hB5APB3UYCqUblvbHzb08w9+Inn0ewvIaiU2q9h9HC0C2W8PAOPDw3Go8wOZ038eAKpj
         WLX9RPL4T/ekZeYe5ZDNSMUc9pf/ao+U54upJ6vsrCsfr3/IEiIhTGas+bvEK4K3D3cR
         nUjTA49qrTcJlpZMErxatK1+LZBSrFLLT9oOZvoN+I5h4dh7ucEi+8cnYDudRIcpiOzc
         BK8Fr9/N22poJrHl66kYIGel8qgXTPac2RULsYa+WExbnlVUSJPPeq5JIFtQtdWk4LUI
         yFYw==
ARC-Message-Signature: i=1; a=rsa-sha256; c=relaxed/relaxed; d=google.com; s=arc-20160816;
        h=feedback-id:content-transfer-encoding:mime-version:precedence
         :list-unsubscribe:list-unsubscribe-post:message-id:subject:reply-to
         :from:to:date:dkim-signature:dkim-signature;
        bh=0IQGtrtnLa4agSSllddRWwVkhkM/lU4gpshqJrNPylg=;
        fh=vO/QRGnTCAqtyINMJ4jFyahE0jji2iqzbFwKde/Fko8=;
        b=nFJ0EEOIJjSDy2O9flifKs9i/ALJGZek88IkYI1ubFXunRNTn0aU5MSkFtnk1hdyMb
         8/nS6/zH9Zz2k+7cnrn+5KYjvjMyYKxPjutDuWL9ERtJC0bhL6RTn7gEKdshEFOHj34N
         yFKzStO7qWbAPk6UNm/CezjGFyi469VB754C3t9bw8n8iN2uUj8LwoAKPiLeLxNQ0CEN
         nVle+zcpJEMGYedcTR6SNohZhG1ZBhbOsJZ7p0nTwznqJbR4DdKxf+KhFyNU65inidOg
         mduyWaSF2HDy3hCEldvcXvRGVH9lztNHjJAaVNl7O3CoX3kSX13E/p6YHQHZfIfiRqet
         8ZPg==;
        dara=google.com
ARC-Authentication-Results: i=1; mx.google.com;
       dkim=pass header.i=@domainesia.com header.s=ue53egqn6wtdy6ntxumd4u76hyxmfges header.b=cesDtOx5;
       dkim=pass header.i=@amazonses.com header.s=ug7nbtf4gccmlpwj322ax3p6ow6yfsug header.b=UJ8xxXoc;
       spf=pass (google.com: domain of 01000190bbbe3fa8-2f38791d-34f7-47e5-a5e1-b94d9dab2444-000000@mailer.domainesia.com designates 54.240.8.78 as permitted sender) smtp.mailfrom=01000190bbbe3fa8-2f38791d-34f7-47e5-a5e1-b94d9dab2444-000000@mailer.domainesia.com;
       dmarc=pass (p=QUARANTINE sp=NONE dis=NONE) header.from=domainesia.com
Return-Path: <01000190bbbe3fa8-2f38791d-34f7-47e5-a5e1-b94d9dab2444-000000@mailer.domainesia.com>
Received: from a8-78.smtp-out.amazonses.com (a8-78.smtp-out.amazonses.com. [54.240.8.78])
        by mx.google.com with ESMTPS id 71dfb90a1353d-4f4d6f0db1fsi129782e0c.107.2024.07.16.06.32.06
        for <recipient@example.com>
        (version=TLS1_3 cipher=TLS_AES_128_GCM_SHA256 bits=128/128);
        Tue, 16 Jul 2024 06:32:06 -0700 (PDT)
Received-SPF: pass (google.com: domain of 01000190bbbe3fa8-2f38791d-34f7-47e5-a5e1-b94d9dab2444-000000@mailer.domainesia.com designates 54.240.8.78 as permitted sender) client-ip=54.240.8.78;
Authentication-Results: mx.google.com;
       dkim=pass header.i=@domainesia.com header.s=ue53egqn6wtdy6ntxumd4u76hyxmfges header.b=cesDtOx5;
       dkim=pass header.i=@amazonses.com header.s=ug7nbtf4gccmlpwj322ax3p6ow6yfsug header.b=UJ8xxXoc;
       spf=pass (google.com: domain of 01000190bbbe3fa8-2f38791d-34f7-47e5-a5e1-b94d9dab2444-000000@mailer.domainesia.com designates 54.240.8.78 as permitted sender) smtp.mailfrom=01000190bbbe3fa8-2f38791d-34f7-47e5-a5e1-b94d9dab2444-000000@mailer.domainesia.com;
       dmarc=pass (p=QUARANTINE sp=NONE dis=NONE) header.from=domainesia.com
DKIM-Signature: v=1; a=rsa-sha256; q=dns/txt; c=relaxed/simple; s=ue53egqn6wtdy6ntxumd4u76hyxmfges; d=domainesia.com; t=1721136726; h=Date:To:From:Reply-To:Subject:Message-ID:List-Unsubscribe-Post:List-Unsubscribe:MIME-Version:Content-Type:Content-Transfer-Encoding; bh=uHtufL0hrABzYsT7nZQyh3yVcOixuLYIbC7btyIjJoo=; b=cesDtOx5oCXKIZF6YX39M/PZqh7yHGRMlBqy+2Tj8C4oKJ9ff1HPMnMeQLEXGpx2 0rvzGTnKsqVzRGp6KQD9kqTJZQiMJGCsHH69AMF1Qkg4BE8XysZM2j+0+W3RFf5r4hN VkBpcnF5ZqT7CmAtoWlyRNu/9gOeR7niy7/XF0Hw=
DKIM-Signature: v=1; a=rsa-sha256; q=dns/txt; c=relaxed/simple; s=ug7nbtf4gccmlpwj322ax3p6ow6yfsug; d=amazonses.com; t=1721136726; h=Date:To:From:Reply-To:Subject:Message-ID:List-Unsubscribe-Post:List-Unsubscribe:MIME-Version:Content-Type:Content-Transfer-Encoding:Feedback-ID; bh=uHtufL0hrABzYsT7nZQyh3yVcOixuLYIbC7btyIjJoo=; b=UJ8xxXoceB8Mm0iUcTngbcQS4x2XHdTrQ7YV+IimqxmWk9Pm9n05gJuDOU2pFenz GW9aNTQ37SQDG8laViJXWcZL18o+metBY/y6w9JQ+wyAmbhwPqAhrNIJIgkIyiSOMDM hgwB6unlLckyxU7n9wYwGAOuxwwWR64BGImsNSpU=
Date: Tue, 16 Jul 2024 13:32:05 +0000
To: recipient@example.com
From: sender@example.com
Reply-To: sender@example.com
Subject: Foo is not bar
Message-ID: <01000190bbbe3fa8-2f38791d-34f7-47e5-a5e1-b94d9dab2444-000000@email.amazonses.com>
X-Mailer: Sendy (https://sendy.co)
List-Unsubscribe-Post: List-Unsubscribe=One-Click
List-Unsubscribe: <https://kantorpos.domainesia.com/unsubscribe/XXXX/XXXX/XXXX>, <mailto:sender@example.com?subject=Unsubscribe>
Precedence: Bulk
MIME-Version: 1.0
Content-Type: text/html; charset=UTF-8
Content-Transfer-Encoding: quoted-printable
Feedback-ID: ::1.us-east-1.GQD689EknjWlHmsna0K1Wt+i1MdgTj9Lel1V6va1bQg=:AmazonSES
X-SES-Outgoing: 2024.07.16-54.240.8.78

<!DOCTYPE html>
<html lang=3D"en">
<head><meta charset=3D"UTF-8"><meta name=3D"viewport" content=3D"width=3Dde=
vice-width, initial-scale=3D1.0">
=09<title>Reseller Announcement</title>
</head>
<body style=3D"margin: 0; padding: 0;">
<table align=3D"center" cellpadding=3D"0" cellspacing=3D"0" style=3D"width:=
100%;max-width:640px;background-color:#ffffff">
=09<tbody>
=09=09<tr>
=09=09=09<td style=3D"width:100%;padding:0;">
=09=09=09<table cellpadding=3D"0" cellspacing=3D"0" style=3D"width:100%;max=
-width:640px;padding:10px 15px;">
=09=09=09=09<tbody>
=09=09=09=09=09<tr>
=09=09=09=09=09=09<td style=3D"padding-bottom: 15px;"><img alt=3D"Image" sr=
c=3D"https://i.dnva.me/b5cf2-general-announcement.png" style=3D"width: 100%=
; height: auto;" /></td>
=09=09=09=09=09</tr>
=09=09=09=09=09<tr>
=09=09=09=09=09=09<td>
=09=09=09=09=09=09<div>
=09=09=09=09=09=09<p style=3D"text-align: justify;"><span style=3D"font-fam=
ily: -apple-system,BlinkMacSystemFont,'Segoe UI','Roboto','Ubuntu','Open Sa=
ns','Helvetica Neue',sans-serif; font-size: 16px; color: #00AEEF; line-heig=
ht: 1.5;"><b>Hai DomaiNesians,</b> </span></p>

=09=09=09=09=09=09<p style=3D"text-align: justify;"><span style=3D"font-fam=
ily: -apple-system,BlinkMacSystemFont,'Segoe UI','Roboto','Ubuntu','Open Sa=
ns','Helvetica Neue',sans-serif; font-size: 14px; color: #727272; line-heig=
ht: 1.5;">Kami ingin memberitahukan beberapa perubahan penting terkait pros=
es pembayaran manual yang akan berlaku pada Rabu, 17 Juli 2024.</span></p>
=09=09=09=09=09=09</div>

=09=09=09=09=09=09<div>
=09=09=09=09=09=09<ol style=3D"text-align: justify;">
=09=09=09=09=09=09=09<li><span style=3D"font-family: -apple-system,BlinkMac=
SystemFont,'Segoe UI','Roboto','Ubuntu','Open Sans','Helvetica Neue',sans-s=
erif; font-size: 14px; color: #727272; line-height: 1.5;"><b>Kode Aktivasi =
Otomatis Tidak Berlaku Lagi</b><br />
=09=09=09=09=09=09=09Mulai saat ini, kode aktivasi otomatis sudah tidak ber=
laku. Mohon untuk tidak menggunakan metode ini dalam proses pembayaran Anda=
.</span></li>
=09=09=09=09=09=09=09<li><span style=3D"font-family: -apple-system,BlinkMac=
SystemFont,'Segoe UI','Roboto','Ubuntu','Open Sans','Helvetica Neue',sans-s=
erif; font-size: 14px; color: #727272; line-height: 1.5;"><b>Pembayaran Man=
ual Wajib Konfirmasi</b><br />
=09=09=09=09=09=09=09Jika Anda memilih untuk melakukan pembayaran manual me=
lalui Bank BCA atau Bank Mandiri, harap melakukan <a href=3D"https://kantor=
pos.domainesia.com/l/BNSbg9D83tQ8FCkhSjD2FQ/rELOdd763892lBSblBl3WL2OpA/da8a=
oVLh8L62NZD2sSiFMQ" style=3D"color:#0ba8e9;text-decoration: none;display:in=
line-block;">konfirmasi pembayaran</a> segera setelah transfer. Konfirmasi =
ini wajib dilakukan agar pembayaran Anda dapat diproses.</span></li>
=09=09=09=09=09=09=09<li><span style=3D"font-family: -apple-system,BlinkMac=
SystemFont,'Segoe UI','Roboto','Ubuntu','Open Sans','Helvetica Neue',sans-s=
erif; font-size: 14px; color: #727272; line-height: 1.5;"><b>Waktu Proses P=
embayaran Manual</b><br />
=09=09=09=09=09=09=09Pembayaran manual akan memakan waktu hingga 1x24 jam d=
ari waktu konfirmasi. Mohon kesabarannya selama kami memproses pembayaran A=
nda.</span></li>
=09=09=09=09=09=09=09<li><span style=3D"font-family: -apple-system,BlinkMac=
SystemFont,'Segoe UI','Roboto','Ubuntu','Open Sans','Helvetica Neue',sans-s=
erif; font-size: 14px; color: #727272; line-height: 1.5;"><b>Disarankan Men=
ggunakan Pembayaran Instant</b><br />
=09=09=09=09=09=09=09Untuk kenyamanan dan kecepatan transaksi, kami sangat =
menyarankan Anda untuk menggunakan Pembayaran Instant. Metode ini memastika=
n pembayaran Anda diproses dengan lebih cepat dan efisien, tanpa perlu menu=
nggu konfirmasi manual.</span></li>
=09=09=09=09=09=09</ol>
=09=09=09=09=09=09</div>

=09=09=09=09=09=09<div>
=09=09=09=09=09=09<p style=3D"text-align: justify;"><span style=3D"font-fam=
ily: -apple-system,BlinkMacSystemFont,'Segoe UI','Roboto','Ubuntu','Open Sa=
ns','Helvetica Neue',sans-serif; font-size: 14px; color: #727272; line-heig=
ht: 1.5;">Terima kasih atas perhatian dan kerjasamanya. Jika Anda memiliki =
pertanyaan lebih lanjut, jangan ragu untuk menghubungi tim support DomaiNes=
ia pada kanal yang tersedia.</span></p>
=09=09=09=09=09=09</div>

=09=09=09=09=09=09<p style=3D"text-align: justify;"><span style=3D"font-fam=
ily: -apple-system,BlinkMacSystemFont,'Segoe UI','Roboto','Ubuntu','Open Sa=
ns','Helvetica Neue',sans-serif; font-size: 16px; color: #00AEEF; line-heig=
ht: 1.5;">Salam hangat,<br />
=09=09=09=09=09=09=F0=9F=92=99 Tim DomaiNesia </span></p>
=09=09=09=09=09=09</td>
=09=09=09=09=09</tr>
=09=09=09=09</tbody>
=09=09=09</table>
=09=09=09</td>
=09=09</tr>
=09</tbody>
</table>

<table border=3D"0" cellpadding=3D"0" cellspacing=3D"0" style=3D"width:100%=
">
=09<tbody>
=09=09<tr bgcolor=3D"#F2F2F2">
=09=09=09<td align=3D"left" style=3D"text-align:left;font-size:14px" valign=
=3D"middle">
=09=09=09<div style=3D"max-width:620px;margin:40px auto;padding:10px;"><a h=
ref=3D"https://kantorpos.domainesia.com/l/BNSbg9D83tQ8FCkhSjD2FQ/yaK0z8763x=
VbsEiBonVe8qLw/da8aoVLh8L62NZD2sSiFMQ" style=3D"float:left" target=3D"_blan=
k"><img alt=3D"logo" src=3D"https://cldup.com/7MOrHI8mQx.png" width=3D"150p=
x" /></a>

=09=09=09<div style=3D"float:right;margin-top:20px"><a href=3D"https://kant=
orpos.domainesia.com/l/BNSbg9D83tQ8FCkhSjD2FQ/iQPtr5VInjwZ763WSHsIggqw/da8a=
oVLh8L62NZD2sSiFMQ" target=3D"_blank"><img alt=3D"facebook" src=3D"https://=
static.domainesia.com/email/socmed-facebook.png" width=3D"20px" /></a> <a h=
ref=3D"https://kantorpos.domainesia.com/l/BNSbg9D83tQ8FCkhSjD2FQ/j8OguoyZeh=
uIenbghgkDQA/da8aoVLh8L62NZD2sSiFMQ" target=3D"_blank"><img alt=3D"twitter"=
 src=3D"https://static.domainesia.com/email/socmed-twitter.png" width=3D"20=
px" /></a> <a href=3D"https://kantorpos.domainesia.com/l/BNSbg9D83tQ8FCkhSj=
D2FQ/OdRJC4N4DcFdyATFjSvv6A/da8aoVLh8L62NZD2sSiFMQ" target=3D"_blank"><img =
alt=3D"instagram" src=3D"https://static.domainesia.com/email/socmed-instagr=
am.png" width=3D"20px" /></a> <a href=3D"https://kantorpos.domainesia.com/l=
/BNSbg9D83tQ8FCkhSjD2FQ/NfDLB892bVtc5LbOe52892BbKg/da8aoVLh8L62NZD2sSiFMQ" =
target=3D"_blank"><img alt=3D"linkedin" src=3D"https://static.domainesia.co=
m/email/socmed-linkedin.png" width=3D"20px" /></a> <a href=3D"https://kanto=
rpos.domainesia.com/l/BNSbg9D83tQ8FCkhSjD2FQ/gtko8ZYZXKnWv1jJzknh2w/da8aoVL=
h8L62NZD2sSiFMQ" target=3D"_blank"><img alt=3D"youtube" src=3D"https://stat=
ic.domainesia.com/email/socmed-youtube.png" width=3D"20px" /></a></div>

=09=09=09<p style=3D"line-height:1.5;font-size:14px;color:#40444E;font-fami=
ly:-apple-system,BlinkMacSystemFont,'Segoe UI','Roboto','Ubuntu','Open Sans=
','Helvetica Neue',sans-serif;">&nbsp;</p>

=09=09=09<p style=3D"line-height:1.5;font-size:14px;color:#40444E;font-fami=
ly:-apple-system,BlinkMacSystemFont,'Segoe UI','Roboto','Ubuntu','Open Sans=
','Helvetica Neue',sans-serif;">&nbsp;</p>

=09=09=09<p style=3D"line-height:1.5;font-size:14px;color:#40444E;font-fami=
ly:-apple-system,BlinkMacSystemFont,'Segoe UI','Roboto','Ubuntu','Open Sans=
','Helvetica Neue',sans-serif;">PT Deneva<br />
=09=09=09Deneva Hub<br />
=09=09=09Jl. Rogoyudan 1 No. 2, Sleman, Yogyakarta 55284<br />
=09=09=09<a href=3D"https://kantorpos.domainesia.com/unsubscribe/BmpN9oSz2f=
bfIdqssRG9XUGuYTracuRw7638KLExaJxc0/Xlvo6GnUdjwD94elczR2kQ/da8aoVLh8L62NZD2=
sSiFMQ" style=3D"font-size:9px;color:#40444E;text-decoration:none;">Unsubsc=
ribe</a></p>
=09=09=09</div>
=09=09=09</td>
=09=09</tr>
=09</tbody>
</table>
</body>
</html>
<img src=3D"https://kantorpos.domainesia.com/t/da8aoVLh8L62NZD2sSiFMQ/BNSbg=
9D83tQ8FCkhSjD2FQ" alt=3D"" style=3D"width:1px;height:1px;"/>`
}