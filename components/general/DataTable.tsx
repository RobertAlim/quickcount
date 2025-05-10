"use client";

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";

type RowType = {
	barangay: string;
	pollingPlace: string;
	totalVoters: number;
	gusTambunting: number;
	brianYamsuan: number;
	rodelEspinola: number;
	florentinoBaguio: number;
	rolandoAguilar: number;
	totalVotesCast: number;
};

type GroupedData = {
	barangay: string;
	totals: {
		totalVoters: number;
		gusTambunting: number;
		brianYamsuan: number;
		rodelEspinola: number;
		florentinoBaguio: number;
		rolandoAguilar: number;
		totalVotesCast: number; // New field
	};
	polling_places: {
		pollingPlace: string;
		totalVoters: number;
		gusTambunting: number;
		brianYamsuan: number;
		rodelEspinola: number;
		florentinoBaguio: number;
		rolandoAguilar: number;
		totalVotesCast: number; // New field
	}[];
};
export default function DataTable({ data }: { data: RowType[] }) {
	const groupedData = groupDataByBarangay(data);

	const overall = data.reduce(
		(acc, item) => {
			const totalVotesCastForItem =
				item.gusTambunting +
				item.brianYamsuan +
				item.rodelEspinola +
				item.florentinoBaguio +
				item.rolandoAguilar;

			return {
				total_voters: acc.total_voters + item.totalVoters,
				gus_tambunting: acc.gus_tambunting + item.gusTambunting,
				brian_yamsuan: acc.brian_yamsuan + item.brianYamsuan,
				rodel_espinola: acc.rodel_espinola + item.rodelEspinola,
				florentino_baguio: acc.florentino_baguio + item.florentinoBaguio,
				rolando_aguilar: acc.rolando_aguilar + item.rolandoAguilar,
				total_votes_cast: acc.total_votes_cast + totalVotesCastForItem,
			};
		},
		{
			total_voters: 0,
			gus_tambunting: 0,
			brian_yamsuan: 0,
			rodel_espinola: 0,
			florentino_baguio: 0,
			rolando_aguilar: 0,
			total_votes_cast: 0, // <- new field for total of all candidate votes
		}
	);

	return (
		<div className="relative">
			{/* Sticky total header row */}
			<div className="sticky top-0 z-50 bg-amber-100 border-b shadow-sm px-5">
				<table className="w-full table-fixed text-lg">
					<thead>
						<tr>
							<th className="w-[20%] text-left font-bold"></th>
							<th className="w-[10%] text-right text-xl font-bold">Gus</th>
							<th className="w-[10%] text-right text-xl font-bold">Yamsuan</th>
							<th className="w-[10%] text-right text-xl font-bold">Espinola</th>
							<th className="w-[10%] text-right text-xl font-bold">Baguio</th>
							<th className="w-[10%] text-right text-xl font-bold">Aguilar</th>
							<th className="w-[10%] text-right text-xl font-bold">Voters</th>
							<th className="w-[10%] text-right text-xl font-bold">Voted</th>
							<th className="w-[10%] text-right text-xl font-bold">(-)</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td className="w-[20%] text-left font-bold">TOTAL</td>

							<td className="w-[10%] text-right text-xl font-bold">
								{overall.gus_tambunting.toLocaleString()}
							</td>
							<td className="w-[10%] text-right text-xl font-bold">
								{overall.brian_yamsuan.toLocaleString()}
							</td>
							<td className="w-[10%] text-right text-xl font-bold">
								{overall.rodel_espinola.toLocaleString()}
							</td>
							<td className="w-[10%] text-right text-xl font-bold">
								{overall.florentino_baguio.toLocaleString()}
							</td>
							<td className="w-[10%] text-right text-xl font-bold">
								{overall.rolando_aguilar.toLocaleString()}
							</td>
							<td className="w-[10%] text-right text-xl font-bold">
								{overall.total_voters.toLocaleString()}
							</td>
							<td className="w-[10%] text-right text-xl font-bold">
								{overall.total_votes_cast.toLocaleString()}
							</td>
							<td className="w-[10%] text-right text-xl font-bold">
								{(
									overall.total_voters - overall.total_votes_cast
								).toLocaleString()}
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<Accordion type="multiple" className="overflow-x-auto">
				{groupedData.map((barangay) => (
					<AccordionItem value={barangay.barangay} key={barangay.barangay}>
						<AccordionTrigger className="text-sm font-semibold bg-green-50 hover:bg-green-100 hover:no-underline focus:outline-none focus:bg-green-100 px-6">
							<table className="w-full table-fixed text-sm">
								<thead>
									<tr className="text-left text-lg">
										<th className="w-[20%]">{barangay.barangay}</th>

										<th className="w-[10%] text-right">
											{barangay.totals.gusTambunting.toLocaleString()}
										</th>
										<th className="w-[10%] text-right">
											{barangay.totals.brianYamsuan.toLocaleString()}
										</th>
										<th className="w-[10%] text-right">
											{barangay.totals.rodelEspinola.toLocaleString()}
										</th>
										<th className="w-[10%] text-right">
											{barangay.totals.florentinoBaguio.toLocaleString()}
										</th>
										<th className="w-[10%] text-right">
											{barangay.totals.rolandoAguilar.toLocaleString()}
										</th>
										<th className="w-[10%] text-right">
											{barangay.totals.totalVoters.toLocaleString()}
										</th>
										<th className="w-[10%] text-right">
											{barangay.totals.totalVotesCast.toLocaleString()}
										</th>
										<th className="w-[10%] text-right">
											{(
												barangay.totals.totalVoters -
												barangay.totals.totalVotesCast
											).toLocaleString()}
										</th>
									</tr>
								</thead>
							</table>
						</AccordionTrigger>
						<AccordionContent>
							<Card className="border bg-white shadow-sm">
								<CardContent>
									<table className="w-full table-fixed text-sm">
										<tbody>
											{barangay.polling_places.map((place, idx) => (
												<tr
													key={idx}
													className="border-t even:bg-gray-100 odd:bg-white"
												>
													<td className="w-[20%]">{place.pollingPlace}</td>
													<td className="w-[10%] text-right">
														{place.gusTambunting.toLocaleString()}
													</td>
													<td className="w-[10%] text-right">
														{place.brianYamsuan.toLocaleString()}
													</td>
													<td className="w-[10%] text-right">
														{place.rodelEspinola.toLocaleString()}
													</td>
													<td className="w-[10%] text-right">
														{place.florentinoBaguio.toLocaleString()}
													</td>
													<td className="w-[10%] text-right">
														{place.rolandoAguilar.toLocaleString()}
													</td>
													<td className="w-[10%] text-right">
														{place.totalVoters.toLocaleString()}
													</td>
													<td className="w-[10%] text-right">
														{(
															place.gusTambunting +
															place.brianYamsuan +
															place.rodelEspinola +
															place.florentinoBaguio +
															place.rolandoAguilar
														).toLocaleString()}
													</td>
													<td className="w-[10%] text-right">
														{(
															place.totalVoters -
															(place.gusTambunting +
																place.brianYamsuan +
																place.rodelEspinola +
																place.florentinoBaguio +
																place.rolandoAguilar)
														).toLocaleString()}
													</td>
												</tr>
											))}
										</tbody>
									</table>
								</CardContent>
							</Card>
						</AccordionContent>
					</AccordionItem>
				))}
			</Accordion>
		</div>
	);
}

export function groupDataByBarangay(data: RowType[]): GroupedData[] {
	const grouped: Record<string, GroupedData> = {};

	for (const row of data) {
		const totalVotesCast =
			row.gusTambunting +
			row.brianYamsuan +
			row.rodelEspinola +
			row.florentinoBaguio +
			row.rolandoAguilar;

		if (!grouped[row.barangay]) {
			grouped[row.barangay] = {
				barangay: row.barangay,
				totals: {
					totalVoters: 0,
					gusTambunting: 0,
					brianYamsuan: 0,
					rodelEspinola: 0,
					florentinoBaguio: 0,
					rolandoAguilar: 0,
					totalVotesCast: 0, // New field
				},
				polling_places: [],
			};
		}

		// Aggregate totals per barangay
		grouped[row.barangay].totals.totalVoters += row.totalVoters;
		grouped[row.barangay].totals.gusTambunting += row.gusTambunting;
		grouped[row.barangay].totals.brianYamsuan += row.brianYamsuan;
		grouped[row.barangay].totals.rodelEspinola += row.rodelEspinola;
		grouped[row.barangay].totals.florentinoBaguio += row.florentinoBaguio;
		grouped[row.barangay].totals.rolandoAguilar += row.rolandoAguilar;
		grouped[row.barangay].totals.totalVotesCast += totalVotesCast;

		// Group polling place
		const pollingPlace = grouped[row.barangay].polling_places.find(
			(p) => p.pollingPlace === row.pollingPlace
		);

		if (pollingPlace) {
			pollingPlace.totalVoters += row.totalVoters;
			pollingPlace.gusTambunting += row.gusTambunting;
			pollingPlace.brianYamsuan += row.brianYamsuan;
			pollingPlace.rodelEspinola += row.rodelEspinola;
			pollingPlace.florentinoBaguio += row.florentinoBaguio;
			pollingPlace.rolandoAguilar += row.rolandoAguilar;
		} else {
			grouped[row.barangay].polling_places.push({
				pollingPlace: row.pollingPlace,
				totalVoters: row.totalVoters,
				gusTambunting: row.gusTambunting,
				brianYamsuan: row.brianYamsuan,
				rodelEspinola: row.rodelEspinola,
				florentinoBaguio: row.florentinoBaguio,
				rolandoAguilar: row.rolandoAguilar,
				// You may also include this if needed:
				totalVotesCast: totalVotesCast,
			});
		}
	}

	return Object.values(grouped);
}
