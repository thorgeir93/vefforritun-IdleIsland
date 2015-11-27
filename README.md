# Lokaverkefni í Vefforritun

####Höfundar:  
Jósúa Theodórsson - **jot17**  
Þorgeir Sigurðsson - **ths182**  
Þorkell Máni Þorkelsson - **thth123**

**Kennari:** Ólafur Sverrir Kjartansson

##Verkefnið

Við ákvöðum þegar við völdum verkefni að nota beinagrind af *idle* leik sem við höfðum verið að dunda okkur við áður fyrr. Idle leikir snúast yfirleitt um að safna pening með því að klikka með músinni á einhvern hlut sem skilar ákveðinni gerð af gjaldmiðli, t.d gullpeningum og býr til *upgrades* til að safna gjaldmiðli hraðar til að kaupa fleiri *upgrades* 	o.s.frv.  
Þema leiksins sem við bjuggum til er að aðalkarakterinn er skipreka á eyðieyju og safnar kókoshnetum til að geta keypt *upgrades*. Þessi *upgrade* eru m.a. moldvörpumannabræður sem hjálpa að til að safna kókoshnetum, boxhanskar sem leyfa aðalkarakternum að lemja pálmatré fastar til að fá fleiri kókoshentur í hverju höggi o.fl. 

##Notkun verkefnisins
  
Þegar notandi fer inn á slóð verkefnisins þá blasir við honum innskráningarsíða. Ef hann á ekki aðgang þá verður hann að búa til einn í *Create new User*. Annars slær hann inn aðgangsupplýsingar og skráir sig inn. Þegar því er lokið er notandi inn á *menu* síðunni. Þar getur notandinn farið í *View Friends*, *Add Friends*, *High Scores*, *Settings* og *Play*. Þetta eru allt HTML síður sem hafa samskipti svipað og síðurnar í verkefni 6.  

* **View Friends** - Þar getur notandi skoðað vinalistann sinn og skoðað eyjurnar hjá þeim öllum.  
* **Add Friends** -  notandi getur bætt vinum á vinalistann sinn.  
* **High Scores** - þeir notendur með hæstan fjölda af áunnum kókoshnetum sýndir.
* **Settings** - Hægt að breyta stillingum (bara hljóði eins og er).
* **Play** - Leikurinn er spilaður.
  
Þegar notandi fer í **Play** þá byrjar leikurinn, allar myndir og hljóð eru *preloaded* svo það er ekkert hökt á birtingu/spilun þeirra. Síðan getur notandinn klikkað á tré sem sést og byrjað að safna kókoshnetum. Þegar notandinn á nóg af kókoshnetum getur hann keypt upgrades í upgrade valmyndinni. Þegar hann hefur keypt viðkomandi upgrade þá fær hann fleiri kókoshnetur, annað hvort fleiri í hverju höggi eða sjálfvirkt fleiri á tímaeiningu. Þegar sérstakt *upgrade* er keypt þá getur notandi farið neðanjarðar þar sem fleiri *upgrade* eru í boði og útlitið annað.

##Umhverfið
Umhverfin sem voru notuð eru Node.js, PostgreSQL, CSS, Express og jQuery. Verkefnið er *hostað* á Heroku.
Öll virkni var útfærð í javaScript, allt CSS var gert með SCSS og HTML skjöl í Jade. 

##Lausnir
Fyrir notendastjórnun þá var innskráningarkerfið í verkefni 6 nýtt sem grunnur, en bætt við ýmsum villumeldingum.   
Hver notandi á sinn eigin vinalista. Það var leyst með því að bæta töflu við gagnagrunninn (taflan heitir *friends*) sem inniheldur 2 dálka, *username* og *friendid*. Hver notandi er með eina röð í *username* sem inniheldur hans notendanafn og í *friendid* er strengur sem inniheldur fyrst notendanafn notandans svo runa af notendanöfnum vina hans, þá `{friendid:"notandi1, vinur1, vinur2"}`. Þegar notandi bætir við vini þá er strengurinn í *friendid* uppfærður með nýja vininum aftast með Postgres fyrirspurn sem notar notendanafn í *username* dálknum sem lykil, svo strengurinn verður `{friendid:"notandi1, vinur1, vinur2, vinur3"}`.  
Vinur er skoðaður með einfaldri postgres fyrirspurn sem sækir *friendid* strenginn í *friends* töflunni. Strengurinn er síðan hreinsaður, eigið notendanafn tekið út og síðan er hann birtur.  
High Scores kerfið er postgres fyrirspurn sem sækir *scores* í *gamestate* töfluna og raðar eftir stærðarröð. *Gamestate* taflan inniheldur allar upplýsingar sem viðkoma einstökum notendum. í henni eru 2 dálkar, *username* (lykill) og *gamestate* sem eru allar upplýsingar um stöðuna á leik notenda.  
Þegar notandi vill skoða eyjuna hjá vini sínum, þá er takki í *View Friends* sem sækir *gamestate* hjá þessum vini og teiknar eyjuna (með engri virkni nema að hætta og til að fara neðanjarðar).  
Allir takkar áður en farið er í *Play* eru gerðir með HTML og allt útlit er CSS, en þegar almenn spilun á leiknum er hafin (ýtt er á *Play*) þá neyddumst við til að breyta til. Upphaflega planið var að allir takkar og allt útlit væri gert í javaScript en þar sem það reyndist ekki vera mjög skalanlegt, þá breyttum við til og núna er mix af javaScript tökkum og útliti fyrir allt sem viðkemur leiknum sjálfum (klikka á tré og kaupa *upgrades*). Allt sem viðkemur *navigation* er í HTML, t.d. hætta í leiknum og fara í menu, settings takkinn og skipta um á milli ofan/neðanjarðar. Leikurinn er skalanlegur að vissu marki. Til að fá mismunandi myndir á skjáinn voru mismunandi *Display *notuð, en þau eru með bakgrunn og takkamynstur en takkarnir eru með sér virkni og mynd. Þá er t.d. *Upgrades* og *Settings* með mismunandi *Display*.