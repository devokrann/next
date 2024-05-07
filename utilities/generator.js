const crypto = require("crypto");

try {
	const buf = crypto.randomBytes(64);
	console.log(`+-> Key generated(${buf.length} bytes): ${buf.toString("hex")}`);
} catch (error) {
	console.error("x-> Key generation failure:", error.message);
}
