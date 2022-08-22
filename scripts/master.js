function sN(ns, current="home", set=new Set()) {
	let connections = ns.scan(current)
	let next = connections.filter(c => !set.has(c))
	next.forEach(n => {
		set.add(n);
		return sN(ns, n, set)
	})
	return Array.from(set.keys())
}
function threadCount(ns, hostname, scriptRam) {
	let threads = 0;
	let free_ram = ns.getServerMaxRam(hostname) - ns.getServerUsedRam(hostname)

	threads = free_ram / scriptRam
	return Math.floor(threads)
}

export async function main(ns) {
	let servers = sN(ns);

	while(true){
		for (let server of servers){
			if(ns.hasRootAccess(server) && server !="home"){
				try{
					await ns.scp("hack.js", server, "home")
				}catch{}
				try{
					let available_threads = threadCount(ns, server, 2.35)
					if(available_threads >=1){
					ns.exec("hack.js", server, available_threads)
					}
				}catch{}
				}else{
					await ns.scp("attack.js", server, "home")
					ns.exec("attack.js", server)
				}
			await ns.sleep(20)
		}

	}
}
