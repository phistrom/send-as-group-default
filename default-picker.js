
/**
 * Sleep function that uses new Promise object.
 * Copied from https://stackoverflow.com/a/39914235/489667
 *
 * @param {number} ms The number of milliseconds to wait for
 */
function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Selects the option that starts with "Post on behalf of" 
 * when the author menu is open.
 */
function clickTheOption() {
	let items = document.getElementsByClassName("gux-combo-item");
	for (let i = 0; i < items.length; i++) {
		let item = items[i];
		if (item.innerHTML.startsWith("Post on behalf of")) {
			item.click();
			return;
		}
	}
}

/**
 * Clicks the author button if the button says starts with "me ("
 * which causes the author menu to open. If we are not on a topic page,
 * this function returns immediately. Since the topic page can take a while 
 * to load everything, this function polls every 500 milliseconds until it 
 * can find the button. It is async so that we can use the await sleep 
 * function.
 */
async function clickPostOnBehalf() {
	while (window.location.href.includes("#!topic")) {
		let elements = document.getElementsByTagName("span");
		for (let i = 0; i < elements.length; i++) {
			let e = elements[i];
			if (e.innerHTML.startsWith("me (")) {
				// console.log("Found the button.");
				e.click();
				clickTheOption();
				return;
			}
			else if (e.innerHTML.startsWith("Post on behalf of")) {
				// console.log("Looks like the author is already set.");
				return;
			}
		}
		// console.log("Didn't find the button...");
		await sleep(500);
	}
}

window.addEventListener('popstate', clickPostOnBehalf);  // do this every time the URL changes
clickPostOnBehalf();
