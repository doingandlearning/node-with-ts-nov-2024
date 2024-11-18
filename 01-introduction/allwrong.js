function errorSoon(n) {
	if (n === 0) {
		throw new Error("Something went wrong!")
	}
	let newN = n - 1
	errorSoon(newN)
}

// this won't trigger a refresh
errorSoon(99)