/** @param {NS} ns */
export async function main(ns) {
	var name = ns.getHostname();
		if(ns.getServerMoneyAvailable(name) < ns.getServerMaxMoney(name)){
			await ns.grow(name)
		}else if(ns.getServerSecurityLevel(name) > ns.getServerMinSecurityLevel(name)){
			await ns.weaken(name)
		}else {
			while(ns.getServerMoneyAvailable(name) > (ns.getServerMaxMoney(name) / 2) && ns.getServerSecurityLevel(name) > (ns.getServerMinSecurityLevel(name) *.20) ){
				await ns.hack(name)
			}
		}
}
