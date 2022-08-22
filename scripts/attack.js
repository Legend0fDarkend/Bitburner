/** @param {NS} ns */
export async function main(ns) {
	var name = ns.getHostname();
	var rep = false;
	do{
		try{
			await ns.brutessh(name)
			await ns.ftpcrack(name)
			await ns.relaysmtp(name)
			await ns.nuke(name)


		}catch{}

	}while(rep)
}
