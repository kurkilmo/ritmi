import Link from "next/link"

export default async function Rules() {
    const Nav = () => {
        return (
            <nav>
                <Link href="/">
                    Koti
                </Link>
            </nav>
        )
    }

    return (
        <div className="rulePage">
            <Nav />
            <h1>Sitsien Säännöt</h1>
			<ol>
			<li>
				Sitseille tulee pukeutua teeman mukaisella tavalla. Sitseillä on yleensä jokin teema, jota osallistujien tulee noudattaa pukeutumisessaan parhaansa mukaan.
			</li>
			<li>
				Sitseillä ei myöhästytä. Myöhästyjiä sekä muutoinkin sääntöjä rikkovia rangaistaan kohdan 9 mukaisesti.
			</li>
			<li>
				Pöytään istutaan vasta toastmasterin luvalla. Toastmaster antaa luvan pöydän ääreen istumiseen ja ruokailun aloittamiseen. Hän myös kertaa sitsien säännöt tilaisuuden alkajaisiksi.
			</li>
			<li>
				Sitseillä toastmasterin sana on laki. Toastmasterin puhuessa kaikki hiljenevät kuuntelemaan hänen antamiaan ohjeita, joita juhlijoiden tulee noudattaa tinkimättömästi.
			</li>
			<li>
				Pöydästä ei nousta ilman toastmasterin lupaa. Toastmaster antaa luvan pöydän äärestä nousemiseen sekä määrää tauot ja niiden kestot. Jos koet suunnatonta tarvetta poistua esimerkiksi vessaan periodin aikana, tulee se tehdä hiljaa ja huomaamattomasti muita häiritsemättä.
			</li>
			<li>
				Sitseillä puhelimen viihdekäyttö on ankarasti kiellettyä. Sähköistä laulukirjaa saa kuitenkin käyttää puhelimella toastmasterin niin salliessa.
			</li>
			<li>
				Jokainen laulu päättyy skoolaukseen. Näillä sitseillä skoolataan ensimmäiseksi viistoon __, sitten viistoon __ ja vielä loppuun suoraan edessä istuvalle.
			</li>
			<li>
				Suosionosoitukset: Sitseillä suosionosoituksia ei anneta käsiä yhteen taputtamalla. Suosionosoituksia voi antaa hakkaamalla kämmeniä pöytään kohtuullisella voimakkuudella.
			</li>
			<li>
				Edellä mainittujen sääntöjen rikkomisesta seuraa ankaria rangaistuksia.
			</li>
			</ol>
        </div>
    )
}

export async function generateMetadata() {
	return {
		title: "Sitsien säännöt"
	}
}
/*

1. Sitseille tulee pukeutua teeman mukaisella tavalla. Sitseillä on yleensä jokin teema, jota osallistujien tulee noudattaa pukeutumisessaan parhaansa mukaan.
2. Sitseillä ei myöhästytä. Myöhästyjiä sekä muutoinkin sääntöjä rikkovia rangaistaan kohdan 9 mukaisesti.
3. Pöytään istutaan vasta toastmasterin luvalla. Toastmaster antaa luvan pöydän ääreen istumiseen ja ruokailun aloittamiseen. Hän myös kertaa sitsien säännöt tilaisuuden alkajaisiksi.
4. Sitseillä toastmasterin sana on laki. Toastmasterin puhuessa kaikki hiljenevät kuuntelemaan hänen antamiaan ohjeita, joita juhlijoiden tulee noudattaa tinkimättömästi.
5. Pöydästä ei nousta ilman toastmasterin lupaa. Toastmaster antaa luvan pöydän äärestä nousemiseen sekä määrää tauot ja niiden kestot. Jos koet suunnatonta tarvetta poistua esimerkiksi vessaan periodin aikana, tulee se tehdä hiljaa ja huomaamattomasti muita häiritsemättä.
6. Sitseillä puhelimen viihdekäyttö on ankarasti kiellettyä. Sähköistä laulukirjaa saa kuitenkin käyttää puhelimella toastmasterin niin salliessa.
7. Jokainen laulu päättyy skoolaukseen. Näillä sitseillä skoolataan ensimmäiseksi viistoon __, sitten viistoon __ ja vielä loppuun suoraan edessä istuvalle.
8. Suosionosoitukset: Sitseillä suosionosoituksia ei anneta käsiä yhteen taputtamalla. Suosionosoituksia voi antaa hakkaamalla kämmeniä pöytään kohtuullisella voimakkuudella.
9. Edellä mainittujen sääntöjen rikkomisesta seuraa ankaria rangaistuksia.

*/
