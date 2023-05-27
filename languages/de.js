const language = {
    loadevent: "Wiedergabeevent geladen",
    loadcmd: "Befehl geladen",
    ready: "erfolgreich verbunden.",
    loadslash: "Erfolgreich die Anwendungs-[/]-Befehle neugeladen.",
    error1: "Das Bot-Token, das Sie in Ihr Projekt eingegeben haben, ist falsch oder die INTENDS Ihres Bots sind aus!",
    error2: "Bitte setzen Sie das Bot-Token in token.js oder in Ihrer .env-Datei in Ihrem Projekt!",
    loadclientevent: "Client-Ereignis geladen",
    embed1: "Sie brauchen die <@&{djRole}>(DJ) Rolle dieses Servers um die Befehle zu benutzen. Benutzer ohne diese Rolle können {cmdMAP} nicht verwenden.",
    message1: "Sie sind nicht mit einem Audiokanal verbunden. ❌",
    message2: "Sie sind nicht in demselben Audiokanal wie ich. ❌",
    message3: "Fehlende Berechtigung",
    msg4: "Etwas ist schief gelaufen",
    msg5: "Derzeit spielt keine Musik. ❌",
    msg6: "Musik speichern",
    msg7: "Schreiben Sie den Playlistnamen.",
    msg8: "Diese Lied wird live gestreamt, demnach gibt es keine Wiedergabedauer zum Anzeigen. 🎧",
    msg9: "**✅ Erfolg:** Zeitdaten aktualisiert.",
    msg10: "Sie haben noch keine Playlist mit diesem Namen. ❌",
    msg11: "Diese Musik befindet sich bereits in dieser Playlist. ❌",
    msg12: "zu Ihrer Playlist hinzugefügt.",
    error3: "Fehler beim Neuladen der Anwendungs-[/]-Befehle: ",
    error4: "WARNUNG: Es sieht so aus als hätten Sie keine mongodb url angegeben? Wenn Sie keine valide mongodb url in der config.js Datei angeben, sind Sie nicht in der Lage den Bot zu verwenden.",
    msg13: `🎵 Jetzt läuft: **{track?.title}** -> Kanal: **{queue?.connection.channel.name}** 🎧`,
    msg14: "Die Warteschlange ist leer. Sie können mehr Musik spielen, tschüss... ✅",
    msg15: "Ich habe den Audiokanal verlassen, weil niemand mehr übrig ist. ❌",
    msg16: "Ich habe Probleme, mich mit dem Sprachkanal zu verbinden. ❌ Als ob mich jemand getrennt hätte?! Ich bin sehr traurig. 😔",
    msg17: "Es gibt keinen vorherigen Track! ❌",
    msg18: "Jetzt läuft **{queue.previousTracks[1].title}**. ✅",
    msg19: " Bot-Statistik",
    msg20: "Aktualisieren",
    msg21: "**Ihre Zeit ist vorbei!**",
    msg22: "**✅ Daten aktualisiert.**",
    msg23: "Die Warteschlange ist leer. ❌",
    msg24: "Die Warteschlange wurde gerade geleert. 🗑️",
    msg26: "Wenn Sie keine DJ-Rolle angeben, können Sie den Befehl nicht verwenden!",
    msg25: "Die DJ-Rolle wurde erfolgreich auf <@&{role}> gesetzt.",
    msg27: "Die DJ-Rolle wurde erfolgreich gelöscht.",
    msg28: "Die DJ-Rolle ist noch nicht festgelegt.",
    msg29: `Bitte geben Sie einen gültigen Filternamen ein. ❌\n{filters}`,
    msg30: `Ich konnte keinen Filter mit diesem Namen finden. ❌\n{filters}`,
    msg31: `Angewandt: **{filter}**, Filterstatus: **{status}**\n **Denken Sie daran, wenn die Musik lang ist, können die Filteranträge entsprechend länger sein.**`,
    msg32: "Es ist Zeit, Musik auf Ihrem Discord-Server mit einer völlig kostenlosen und erweiterten Oberfläche zu hören. Ein Musikboot, der das Spielen von Musik auf vielen Plattformen unterstützt und Ihren Server besonders fühlen lässt. Erstellen Sie Ihren eigenen Musikbot: https://github.com/umutxyp/MusicBot",
    msg33: "Bot-Befehle",
    msg34: "Sie haben hier bereits einen aktiven Befehl. ❌",
    msg35: "Warteschlange",
    msg36: "Jetzt läuft Musik",
    msg37: "Wiederholung beenden",
    msg38: "Schleifensystem",
    msg39: `> **Wie wäre es mit einer Wahl?**
   > **Warteschlange:** Wiederholt die Warteschlange.
   > **Jetzt läuft:** Wiederholt das aktuelle Lied.
   > **Wiederholung beenden:** Beendet die Wiederholung.`,
    msg40: "Warteschlangen-Wiederholungsmodus",
    msg41: "Etwas ist schief gelaufen. ❌",
    msg42: "NWiederholung des aktuellen Liedes",
    msg43: "Der Wiederholungsmodus ist bereits deaktiviert. ❌",
    msg44: `Wiederholung **Beendet** 🔁`,
    msg45: "Zeit ist um",
    msg46: "Wiederholung - Abgeschlossen",
    msg47: "Playlist speichern",
    msg48: "Musik pausiert! ✅",
    msg49: `Pingnachricht`,
    msg50: `Nachrichtenlatenz`,
    msg51: `API-Latenz`,
    msg52: `Es gibt keine Playlist. ❌`,
    msg53: `Sie haben keine Erlaubnis, diese Playlist zu spielen. ❌`,
    msg54: `Sie haben noch keine Musik mit diesem Namen. ❌`,
    msg55: `Ich kann Ihrem Sprachkanal nicht beitreten. ❌`,
    msg56: `Playlist laden... ✅`,
    msg57: `<@{interaction.member.id}>, Hat **{music_filter.length}** Titel zur Warteschlange hinzugefügt. ✅`,
    msg58: `Es gibt keine Playlist mit diesem Namen. ❌`,
    msg59: `Schreiben Sie den Namen des Tracks, den Sie suchen möchten. ❌`,
    msg60: `Keine Ergebnisse gefunden! ❌`,
    msg61: "Musik lädt... 🎧",
    msg62: "genannte Liste wurde zur Playlist hinzugefügt. ✅",
    msg63: `Warteschlange ist leer. ❌`,
    msg64: "Servermusikliste",
    msg65: "Gerade läuft",
    msg66: "Angefordert von",
    msg67: "Seite",
    msg68: `Der Befehlsprozessor wurde abgebrochen. ✅`,
    msg69: `Servermusikliste - Zeit endete!`,
    msg70: `Ihre Zeit ist abgelaufen, um diesen Befehl zu verwenden, Sie können \`/queue\` eingeben, um den Befehl erneut zu benutzen.`,
    msg71: `Etwas ist schief gelaufen. ❌ Es ist, als hätten Sie die Musik noch nie gestoppt.`,
    msg72: "Track wieder aufgenommen! ✅",
    msg73: `Bitte geben Sie einen gültigen Songnamen ein. ❌`,
    msg74: `Keine Suchergebnisse gefunden! ❌`,
    msg75: "Musik gesucht",
    msg76: "Wählen Sie ein Lied von **1** bis **{maxTracks.length}** ⬇️",
    msg77: `Musiksuche abgebrochen. ✅`,
    msg78: `Lädt... 🎧`,
    msg79: "zur Warteschlange hinzugefügt. ✅",
    msg80: `Songsuchzeit abgelaufen ❌`,
    msg81: "Abbrechen",
    msg82: `Die Nummer, die Sie eingegeben haben, ist höher als die Anzahl der Songs in der Warteschlange. ❌`,
    msg83: "Song übersprungen ✅",
    msg84: `Diese Lied wird live gestreamt, demnach gibt es keine Wiedergabedauer zum Anzeigen. 🎧`,
    msg85: `Musik gestoppt.Bis zum nächsten Mal! ✅`,
    msg86: "Aktualisieren",
    msg87: `Momentane Lautstärke: **{queue.volume}** 🔊\n**Um die Lautstärke zu ändern gib eine Zahl zwischen \`1\` und \`{maxVol}\` ein.**`,
    msg88: `Die Lautstärke, die Sie ändern möchten, ist bereits bei der Lautstärke ❌`,
    msg89: `**Geben Sie eine Zahl zwischen \`1\` und \`{maxVol}\` ein, um die Lautstärke zu ändern.** ❌`,
    msg90: "Lautstärke geändert:",
    msg91: `Schreiben Sie den Namen der Playlist, die Sie erstellen möchten. ❌`,
    msg92: `Eine Playlist mit diesem Namen existiert bereits. ❌`,
    msg93: `Sie können nicht mehr als 30 Playlists haben. ❌`,
    msg94: "Erstelle Playlist... 🎧",
    msg95: "Playlist erstellt! 🎧",
    msg96: `Sie haben noch keine Playlist mit diesem Namen. ❌`,
    msg97: "Lösche Playlist... 🎧",
    msg98: "Playlist gelöscht! 🎧",
    msg99: `Schreiben Sie den Namen des Tracks, den Sie suchen möchten. ❌`,
    msg100: `Schreiben Sie den Namen der Playlist, zu denen Sie die Musik hinzufügen möchten. ❌`,
    msg101: `Sie können nicht mehr als {max_music} Songs in einer Playlist haben. ❌`,
    msg102: "Lädt Musik... 🎧",
    msg103: "Alle Songs zu Ihrer Playlist hinzugefügt! 🎧",
    msg104: `Dieser Song läuft bereits in dieser Playlist. ❌`,
    msg105: "zur Playlist hinzugefügt! 🎧",
    msg106: `Schreiben Sie den Namen der Playlist, in der Sie die Musik löschen möchten. ❌`,
    msg107: `Sie haben noch keine Musik mit diesem Namen. ❌`,
    msg108: "Lösche Musik... 🎧",
    msg109: "Musik gelöscht! 🎧",
    msg110: "Schreiben Sie den Namen der Playlist, die Sie durchsuchen möchten. ❌",
    msg111: `Sie haben keine Musik in dieser Playlist. ❌`,
    msg112: "Top öffentliche Playlists",
    msg113: `Ihre Zeit ist abgelaufen, um diesen Befehl zu verwenden, Sie können \`/playlist top\` eingeben, um den Befehl erneut zu benutzen.`,
    msg114: `Es gibt keine öffentlichen Playlists. ❌`,
    msg115: "Ihre Playlists",
    msg116: `Musik`,
    msg117: `Sie haben keine Playlist. ❌`,
    msg118: "Ihre Zeit ist abgelaufen, um diesen Befehl zu verwenden, Sie können `/playlist list {name}` eingeben, um den Befehl erneut zu benutzen.",
    msg119: "Nutzen Sie den **/play playlist <list-name>** Befehl, um diese Playlists zu hören.\nSchreiben Sie **/playlist list <list-name>**, um die Musik in der Playlist zu sehen.",
    msg120: "Bitte geben Sie einen Textkanal an.",
    msg121: "<#{channel}> wurde zu der Liste der erlaubten Textkanäle hinzugefügt. Jetzt können Befehle nur in diesen Kanälen genutzt werden.",
    msg122: "Es sind noch keine Daten registriert.",
    msg123: "<#{channel}> wurde aus der Liste der erlaubten Textkanäle entfernt.",
    msg124: "Dieser Kanal war bereits in der Liste der erlaubten Textkanäle.",
    msg125: "Dieser Kanal ist kein Textkanal.",
    msg126: "❌ Hier ist die Liste der erlaubten Textkanäle: {channel_filter}",
    msg127: "Der Befehl ist nicht definiert.",
    error7: "Bitte versuchen Sie diesen Befehl später erneut. Möglicher Fehler an Bot-Entwickler gemeldet.",
    msg128: "Du hast mich zum Schweigen gebracht, während die Musik spielte. Deshalb habe ich die Musik gestoppt. Wenn Sie die Stummschaltung rückgängig machen, werde ich fortfahren. 😔",
    msg129: "spielt",
    msg130: "Bitte schreiben Sie eine gültige Zahl.",
    msg131: "Um die Befehle in der Liste zu verwenden, müssen Sie für den Bot voten.",
    msg132: "Es ist keine Musik pausiert.",
    msg133: "Ich habe die Reihenfolge in der Playlist durcheinander gebracht.",
    msg134: "Falsche Verwendung. Beispiel: `5:50` | `1:12:43`",
    msg135: "Die Spielzeit wurde erfoglreich auf {queue.formattedCurrentTime} eingestellt",
    msg136: "Autoplay ist jetzt eingeschaltet. Ich werde von nun an zufällige Musik wiedergeben.",
    msg137: "Autoplay ist jetzt ausgeschaltet.",
};
module.exports = language;
