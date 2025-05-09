"use client";

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

type RowType = {
	barangay: string;
	pollingPlace: string;
	totalVoters: number;
	cluster: number;
	gusTambunting: number;
	brianYamsuan: number;
	rodelEspinola: number;
	florentinoBaguio: number;
	rolandoAguilar: number;
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
	};
	polling_places: {
		pollingPlace: string;
		totalVoters: number;
		cluster: number;
		gusTambunting: number;
		brianYamsuan: number;
		rodelEspinola: number;
		florentinoBaguio: number;
		rolandoAguilar: number;
	}[];
};
export default function DataTableTech({ data }: { data: RowType[] }) {
	const groupedData = groupDataByBarangay(data);

	const overall = data.reduce(
		(acc, item) => ({
			total_voters: acc.total_voters + item.totalVoters,
			gus_tambunting: acc.gus_tambunting + item.gusTambunting,
			brian_yamsuan: acc.brian_yamsuan + item.brianYamsuan,
			rodel_espinola: acc.rodel_espinola + item.rodelEspinola,
			florentino_baguio: acc.florentino_baguio + item.florentinoBaguio,
			rolando_aguilar: acc.rolando_aguilar + item.rolandoAguilar,
		}),
		{
			total_voters: 0,
			gus_tambunting: 0,
			brian_yamsuan: 0,
			rodel_espinola: 0,
			florentino_baguio: 0,
			rolando_aguilar: 0,
		}
	);

	return (
		<div className="relative">
			{/* Sticky total header row */}
			<div className="sticky top-0 z-50 bg-amber-100 border-b shadow-sm">
				<table className="w-full table-fixed text-lg">
					<thead>
						<tr>
							<th className="w-[16%] text-left font-bold pl-7">TOTAL</th>
							<th className="w-[12%]"></th>
							<th className="w-[12%]"></th>
							<th className="w-[12%] text-right text-2xl font-bold pr-4">
								{overall.total_voters.toLocaleString()}
							</th>
							<th className="w-[12%] text-right text-2xl font-bold pr-7">
								{overall.gus_tambunting.toLocaleString()}
							</th>
							<th className="w-[12%] text-right text-2xl font-bold pr-11">
								{overall.brian_yamsuan.toLocaleString()}
							</th>
							<th className="w-[12%] text-right text-2xl font-bold pr-15">
								{overall.rodel_espinola.toLocaleString()}
							</th>
							<th className="w-[12%] text-right text-2xl font-bold pr-15">
								{overall.florentino_baguio.toLocaleString()}
							</th>
							<th className="w-[12%] text-right text-2xl font-bold pr-15">
								{overall.rolando_aguilar.toLocaleString()}
							</th>
						</tr>
					</thead>
				</table>
			</div>
			<Accordion type="multiple" className="overflow-x-auto">
				{groupedData.map((barangay) => (
					<AccordionItem value={barangay.barangay} key={barangay.barangay}>
						<AccordionTrigger className="text-sm font-semibold bg-green-50 hover:bg-green-100 hover:no-underline focus:outline-none focus:bg-green-100 px-7">
							<table className="w-full table-fixed text-sm">
								<thead>
									<tr className="text-left border-b">
										<th className="w-[16%]">{barangay.barangay}</th>
										<th className="w-[12%]">Polling Place</th>
										<th className="w-[12%]">Cluster</th>
										<th className="w-[12%] text-right">Total Voters</th>
										<th className="w-[12%] text-right">TAMBUNTING</th>
										<th className="w-[12%] text-right">YAMSUAN</th>
										<th className="w-[12%] text-right">ESPINOLA</th>
										<th className="w-[12%] text-right">BAGUIO</th>
										<th className="w-[12%] text-right">AGUILAR</th>
									</tr>
								</thead>
								<tbody>
									<tr className="border-t text-lg">
										<td className="w=[16%]"></td>
										<td className="w-[12%] text-right"></td>
										<td className="w-[12%] text-right"></td>
										<td className="w-[12%] text-right">
											{overall.total_voters.toLocaleString()}
										</td>
										<td className="w-[12%] text-right">
											{barangay.totals.gusTambunting.toLocaleString()}
										</td>
										<td className="w-[12%] text-right">
											{barangay.totals.brianYamsuan.toLocaleString()}
										</td>
										<td className="w-[12%] text-right">
											{barangay.totals.rodelEspinola.toLocaleString()}
										</td>
										<td className="w-[12%] text-right">
											{barangay.totals.florentinoBaguio.toLocaleString()}
										</td>
										<td className="w-[12%] text-right">
											{barangay.totals.rolandoAguilar.toLocaleString()}
										</td>
									</tr>
								</tbody>
							</table>
						</AccordionTrigger>
						<AccordionContent>
							<Card className="border bg-white shadow-sm">
								<CardContent>
									<table className="w-full table-fixed text-sm">
										<tbody>
											{data.map((row, index) => (
												<tr
													key={index}
													className={
														"border-b " +
														(index % 2 === 0 ? "bg-white" : "bg-gray-50")
													}
												>
													<td className="py-2 px-4">{row.barangay}</td>
													<td className="py-2 px-4">{row.pollingPlace}</td>
													<td className="py-2 px-4">
														<Link
															className="text-green-700 font-semibold"
															href={`/dashboard?clusterId=${row.cluster}`}
														>
															{row.cluster}
														</Link>
													</td>
													<td className="py-2 px-4 text-right">
														{Number(row.totalVoters).toLocaleString()}
													</td>
													<td className="py-2 px-4 text-right">
														{Number(row.gusTambunting).toLocaleString()}
													</td>
													<td className="py-2 px-4 text-right">
														{Number(row.brianYamsuan).toLocaleString()}
													</td>
													<td className="py-2 px-4 text-right">
														{Number(row.rodelEspinola).toLocaleString()}
													</td>
													<td className="py-2 px-4 text-right">
														{Number(row.florentinoBaguio).toLocaleString()}
													</td>
													<td className="py-2 px-4 text-right">
														{Number(row.rolandoAguilar).toLocaleString()}
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
				},
				polling_places: [],
			};
		}

		// Aggregate totals
		grouped[row.barangay].totals.gusTambunting += row.gusTambunting;
		grouped[row.barangay].totals.gusTambunting += row.gusTambunting;
		grouped[row.barangay].totals.brianYamsuan += row.brianYamsuan;
		grouped[row.barangay].totals.rodelEspinola += row.rodelEspinola;
		grouped[row.barangay].totals.florentinoBaguio += row.florentinoBaguio;
		grouped[row.barangay].totals.rolandoAguilar += row.rolandoAguilar;

		// Group polling place
		const pollingPlace = grouped[row.barangay].polling_places.find(
			(p) => p.pollingPlace === row.pollingPlace
		);

		if (pollingPlace) {
			pollingPlace.totalVoters += row.totalVoters;
			pollingPlace.cluster += row.cluster;
			pollingPlace.gusTambunting += row.gusTambunting;
			pollingPlace.brianYamsuan += row.brianYamsuan;
			pollingPlace.rodelEspinola += row.rodelEspinola;
			pollingPlace.florentinoBaguio += row.florentinoBaguio;
			pollingPlace.rolandoAguilar += row.rolandoAguilar;
		} else {
			grouped[row.barangay].polling_places.push({
				pollingPlace: row.pollingPlace,
				totalVoters: row.totalVoters,
				cluster: row.cluster,
				gusTambunting: row.gusTambunting,
				brianYamsuan: row.brianYamsuan,
				rodelEspinola: row.rodelEspinola,
				florentinoBaguio: row.florentinoBaguio,
				rolandoAguilar: row.rolandoAguilar,
			});
		}
	}

	return Object.values(grouped);
}
