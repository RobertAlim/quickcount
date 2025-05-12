"use client";

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import React, { useState } from "react";

type RowType = {
	barangay: string;
	pollingPlace: string;
	cluster: number; // <--- added
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
		totalVotesCast: number;
	};
	polling_places: {
		pollingPlace: string;
		totalVoters: number;
		gusTambunting: number;
		brianYamsuan: number;
		rodelEspinola: number;
		florentinoBaguio: number;
		rolandoAguilar: number;
		totalVotesCast: number;
		clusters: {
			clusterId: string;
			totalVoters: number;
			gusTambunting: number;
			brianYamsuan: number;
			rodelEspinola: number;
			florentinoBaguio: number;
			rolandoAguilar: number;
		}[];
	}[];
};

export default function DataTable({ data }: { data: RowType[] }) {
	const toProperCase = (s: string) =>
		s
			.toLowerCase()
			.replace(/\b\w/g, (c) => c.toUpperCase())
			.replace(/\b(Ii|Bf|Sm)\b/g, (x) => x.toUpperCase());

	const [expandedPollingPlaces, setExpandedPollingPlaces] = useState<
		Record<string, boolean>
	>({});

	const togglePollingPlace = (key: string) => {
		setExpandedPollingPlaces((prev) => ({
			...prev,
			[key]: !prev[key],
		}));
	};

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
											{barangay.polling_places.map((place, idx) => {
												const isOpen =
													expandedPollingPlaces[
														`${barangay.barangay}-${place.pollingPlace}`
													];

												// Aggregate totals from clusters
												const totals = place.clusters.reduce(
													(acc, cluster) => {
														const clusterVotesCast =
															cluster.gusTambunting +
															cluster.brianYamsuan +
															cluster.rodelEspinola +
															cluster.florentinoBaguio +
															cluster.rolandoAguilar;

														return {
															gusTambunting:
																acc.gusTambunting + cluster.gusTambunting,
															brianYamsuan:
																acc.brianYamsuan + cluster.brianYamsuan,
															rodelEspinola:
																acc.rodelEspinola + cluster.rodelEspinola,
															florentinoBaguio:
																acc.florentinoBaguio + cluster.florentinoBaguio,
															rolandoAguilar:
																acc.rolandoAguilar + cluster.rolandoAguilar,
															totalVoters:
																acc.totalVoters + cluster.totalVoters,
															totalVotesCast:
																acc.totalVotesCast + clusterVotesCast,
														};
													},
													{
														gusTambunting: 0,
														brianYamsuan: 0,
														rodelEspinola: 0,
														florentinoBaguio: 0,
														rolandoAguilar: 0,
														totalVoters: 0,
														totalVotesCast: 0,
													}
												);

												return (
													<React.Fragment key={idx}>
														<tr
															className="cursor-pointer bg-blue-100 hover:bg-blue-200 font-semibold"
															onClick={() =>
																togglePollingPlace(
																	`${barangay.barangay}-${place.pollingPlace}`
																)
															}
														>
															<td className="w-[20%]">
																{toProperCase(place.pollingPlace)}
															</td>
															<td className="text-right">
																{totals.gusTambunting.toLocaleString()}
															</td>
															<td className="text-right">
																{totals.brianYamsuan.toLocaleString()}
															</td>
															<td className="text-right">
																{totals.rodelEspinola.toLocaleString()}
															</td>
															<td className="text-right">
																{totals.florentinoBaguio.toLocaleString()}
															</td>
															<td className="text-right">
																{totals.rolandoAguilar.toLocaleString()}
															</td>
															<td className="text-right">
																{totals.totalVoters.toLocaleString()}
															</td>
															<td className="text-right">
																{totals.totalVotesCast.toLocaleString()}
															</td>
															<td className="text-right">
																{(
																	totals.totalVoters - totals.totalVotesCast
																).toLocaleString()}
															</td>
														</tr>

														{isOpen &&
															place.clusters.map((cluster, cid) => {
																const clusterVotesCast =
																	cluster.gusTambunting +
																	cluster.brianYamsuan +
																	cluster.rodelEspinola +
																	cluster.florentinoBaguio +
																	cluster.rolandoAguilar;

																return (
																	<tr key={cid} className="bg-gray-50 border-t">
																		<td className="pl-8 font-semibold">
																			{cluster.clusterId}
																		</td>
																		<td className="text-right">
																			{cluster.gusTambunting.toLocaleString()}
																		</td>
																		<td className="text-right">
																			{cluster.brianYamsuan.toLocaleString()}
																		</td>
																		<td className="text-right">
																			{cluster.rodelEspinola.toLocaleString()}
																		</td>
																		<td className="text-right">
																			{cluster.florentinoBaguio.toLocaleString()}
																		</td>
																		<td className="text-right">
																			{cluster.rolandoAguilar.toLocaleString()}
																		</td>
																		<td className="text-right">
																			{cluster.totalVoters.toLocaleString()}
																		</td>
																		<td className="text-right">
																			{clusterVotesCast.toLocaleString()}
																		</td>
																		<td className="text-right">
																			{(
																				cluster.totalVoters - clusterVotesCast
																			).toLocaleString()}
																		</td>
																	</tr>
																);
															})}
													</React.Fragment>
												);
											})}
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
					totalVotesCast: 0,
				},
				polling_places: [],
			};
		}

		const barangay = grouped[row.barangay];
		barangay.totals.totalVoters += row.totalVoters;
		barangay.totals.gusTambunting += row.gusTambunting;
		barangay.totals.brianYamsuan += row.brianYamsuan;
		barangay.totals.rodelEspinola += row.rodelEspinola;
		barangay.totals.florentinoBaguio += row.florentinoBaguio;
		barangay.totals.rolandoAguilar += row.rolandoAguilar;
		barangay.totals.totalVotesCast += totalVotesCast;

		let pollingPlace = barangay.polling_places.find(
			(p) => p.pollingPlace === row.pollingPlace
		);

		if (!pollingPlace) {
			pollingPlace = {
				pollingPlace: row.pollingPlace,
				totalVoters: 0,
				gusTambunting: 0,
				brianYamsuan: 0,
				rodelEspinola: 0,
				florentinoBaguio: 0,
				rolandoAguilar: 0,
				totalVotesCast: 0,
				clusters: [],
			};
			barangay.polling_places.push(pollingPlace);
		}

		pollingPlace.totalVoters += row.totalVoters;
		pollingPlace.gusTambunting += row.gusTambunting;
		pollingPlace.brianYamsuan += row.brianYamsuan;
		pollingPlace.rodelEspinola += row.rodelEspinola;
		pollingPlace.florentinoBaguio += row.florentinoBaguio;
		pollingPlace.rolandoAguilar += row.rolandoAguilar;
		pollingPlace.totalVotesCast += totalVotesCast;

		let cluster = pollingPlace.clusters.find(
			(c) => c.clusterId === String(row.cluster)
		);

		if (!cluster) {
			cluster = {
				clusterId: String(row.cluster),
				totalVoters: 0,
				gusTambunting: 0,
				brianYamsuan: 0,
				rodelEspinola: 0,
				florentinoBaguio: 0,
				rolandoAguilar: 0,
			};
			pollingPlace.clusters.push(cluster);
		}

		cluster.totalVoters += row.totalVoters;
		cluster.gusTambunting += row.gusTambunting;
		cluster.brianYamsuan += row.brianYamsuan;
		cluster.rodelEspinola += row.rodelEspinola;
		cluster.florentinoBaguio += row.florentinoBaguio;
		cluster.rolandoAguilar += row.rolandoAguilar;
	}

	return Object.values(grouped);
}
