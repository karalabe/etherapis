// EthereumUnits is a map of Ethereum unit labels for powers of thousands.
var EthereumUnits = {
	1:  "Wei",
	2:  "KWei",
	3:  "MWei",
	4:  "Shannon",
	5:  "Szabo",
	6:  "Finney",
	7:  "Ether",
	8:  "KEther",
	9:  "MEther",
	10: "GEther",
	11: "TEther",
};

// formatBalance takes a textual representation of an account balance in Wei and
// formats it into a use friendlier display string.
function formatBalance(balance) {
	// Drop off all the trailing zeros
	var scaling = 1;
	while (balance.endsWith("000")) {
		balance = balance.substr(0, balance.length - 3);
		scaling++;
	}
	// Move the decimal point forward until we do under millions
	var decimals = 0;
	while (balance.length - decimals >= 6) {
		decimals += 3;
		scaling++;
	}
	if (decimals > 0) {
		balance = balance.substr(0, balance.length - decimals) + "." + balance.substr(balance.length - decimals);
	}
	// Cut off any trailing zeros on the decimals
	if (decimals > 0) {
		while (balance[balance.length - 1] == "0") {
			balance = balance.substr(0, balance.length - 1);
		}
	}
	// Append the scaling unit and return
	return balance + " " + EthereumUnits[scaling];
}