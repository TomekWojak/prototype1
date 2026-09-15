import { defineArrayMember, defineField, defineType } from "sanity";

export const faq = defineType({
	name: "faq",
	title: "Najczęstsze pytania",
	type: "document",
	fields: [
		defineField({
			name: "nadkreslenie",
			title: "Mała etykieta nad tytułem",
			type: "string",
			description:
				"Kilka słów pisanych wersalikami, na czerwono, tuż nad dużym tytułem sekcji. Np. „Pytania i odpowiedzi”. Zostaw puste, jeśli nie chcesz jej pokazywać.",
		}),
		defineField({
			name: "tytul",
			title: "Duży tytuł sekcji",
			type: "string",
			description:
				"Napis, który widać jako największy tekst tej sekcji. Ostatnie słowo strona sama pokoloruje na czerwono - przy „Najczęstsze pytania” czerwone będzie „pytania”.",
		}),
		defineField({
			name: "lead",
			title: "Akapit pod tytułem",
			description:
				"Jedno–dwa zdania wprowadzające, drukowane szarym tekstem zaraz pod dużym tytułem.",
			type: "text",
			rows: 2,
		}),
		defineField({
			name: "pytania",
			title: "Pytania",
			type: "array",
			description:
				"Na stronie to lista rozwijana: uczestnik klika pytanie, a odpowiedź się pod nim otwiera. Kolejność przeciągnij myszą.",
			of: [
				defineArrayMember({
					type: "object",
					name: "pytanie",
					fields: [
						defineField({
							name: "pytanie",
							title: "Pytanie",
							type: "string",
							description:
								"Sformułowane tak, jak zapyta uczestnik np. „Dla kogo jest ten festiwal?”",
						}),
						defineField({
							name: "odpowiedz",
							title: "Odpowiedź",
							type: "text",
							rows: 4,
							description:
								"Np. „Dla wszystkich - od dzieci po seniorów, od osób, które nigdy nie widziały taijiquan, po ćwiczących od lat. Program jest tak ułożony, żeby dało się przyjść na godzinę albo zostać na cały dzień.”",
						}),
					],
					preview: {
						select: { title: "pytanie", subtitle: "odpowiedz" },
					},
				}),
			],
		}),
		defineField({
			name: "ctaTytul",
			title: "Zachęta na końcu listy - pytanie",
			type: "string",
			description:
				"Zdanie pod ostatnim pytaniem, np. „Nie ma tu Twojego pytania?”.",
		}),
		defineField({
			name: "ctaEtykieta",
			title: "Zachęta na końcu listy - napis na przycisku",
			type: "string",
			description:
				"Przycisk pod tym zdaniem. Przewija stronę do sekcji Kontakt, np. „Napisz do nas”.",
		}),
	],
	preview: {
		select: { ile: "pytania" },
		prepare: ({ ile }) => ({
			title: "Najczęstsze pytania",
			subtitle: `${Array.isArray(ile) ? ile.length : 0} pytań`,
		}),
	},
});
