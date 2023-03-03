Sooviksin siin märkida, et kogu asi ei ole täielikult ühendatud kuna ma olen veel täiskohaga tudeng, kellel on hetkel eksamiperiood käsil. 

## Ülesehitus

ChatApp folder on backend, kus on API nii Event süsteemile kui ka User control (see on login ja registration)

ClientApp on frontend angular code. 

## Chat

Chat funktsionaalsus on hetkel ülesse ehitatud SignalR kasutades. Kõik, kes on online on seal chatis näha. Omavahel on võimalik saata privaatsõnumeid kui teha topelt click inimese nimel. 

Event süsteem on ülesse ehitatud lihtsaid CRUD operatsiooe kasutades. 

Add event süsteem vormi elemente saab lihtsalt ja kiirelt muuta. Lisasin youtube video lingi, mis näitab kuidas see veebileht toimib ja mis sammud oleksin järgnevalt teinud, et see täielikult valmis saada. 


## Databaasi disain

Hetkel on mul event tabel ja User tabel. Lisak on nende relation tabel kus on eventID ja UserID, mis aitavad SQL relationi luua. Ühesõnaga persistin kaks primary keyd ühes tabelis. Samas lisasin ka sellele tabeli primary key, mis aitab hiljem 
kui lisame filtreerimise süsteemi eventidele. Siis saab databaasi indexida userID järgi, et user näeks evente kuhu ta on ennast registreerinud esmajärjekorras. 


## JWT tokens

alustasin JWT tokeni loomist, mis aitab authenticationiga. Token koosneb Header, payload, and signature. Lihtsalt öeldes kui user on authenticated, saadan tagasi tokeni, mille backend on allkirjastanud. Nüüd kõik API endpointind mis on kaitstus Authorized sõnaga, tuleb token saata headriga. Hetkel see on veits vigane kuna .net6 migreerudes .net7 on olnud mitmeid muutusi, mille debuggmiseks mul ei ole väga palju aega eksami kõrvalt. Angular poole pealt lisasin Guardi ja interceptori, mis lisaks selle tokeni headerisse. 


Lisasin video kus ma kirjeldan veebisaiti.  Youtubis on see nähtav ainult lingiga :  https://youtu.be/Iq-7q_AIwn4

Frontendi poolelt on vormi kontroll lisatud, mis validatib vormi. Helper funkstioon on helper foldering frontendis. 


Kasutasin angulari kuna see moduliseerib kogu protsessi. Iga module on typescript file, html, ja css. Router lubab kiirelt ja lihtsalt routida. Ja typescript lubaba kiirelt ja lihtsalt connectida API serviciga. Angular on ka supportive kui kasutame JWT tokene. 

Küsimuste korral andke teada kui saan abiks olla. 

Databaas on Microsoft SQL server 2022. Ma kasutan docker image, et kasutada microsoft serveri ning Azure Data studio et monitorida. 