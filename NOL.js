/**
 * 	CALCULATE NOL SCRIPT
 *	Functions to calculate the NOL (Net Operating Loss) based on: 
 *  IRS Publication 536, Form 1040 and Schedule A example for "Glen M. Johnson" 
 *
 *  This code is sufficient to calculate the NOL for our needs but
 *  should not be considered a complete solution for any other scenarios.
 *
 *	Code is available at http://github.com...
 * 
 * 	(c) Mahesh Viswanathan, 2020
 * 	mahesh@tinymogul.com
 *
 *  Use freely under the MIT license, https://opensource.org/licenses/MIT  
 *	
 */


//============================================================================
// NOL, IRS EXAMPLE, "GLEN M. JOHNSON". Use for code verification.
//============================================================================

/**
 *  This is the example given by the IRS. Use it to test the code.
 *  Our calculations simplify this by using values in the 1040 form 
 *  to generate the parameters for calculating the NOL.
 */
var paramsGlen = {
	f1040_41 : -8300,
	nonBizCapLossBeforeLimit : 1000,
	nonBizCapGains : 0,
	bizCapLossBeforeLimit : 0,
	bizCapGains : 2000,
	nonBizDeductions : 5950,
	nonBizIncomeOtherThanCapGains : 425,
	NOLfromPrevYears : 0,
	notUsedByUs : 0,
	sa : []
}

nolGlen = calcNOL(paramsGlen)

/** returns:
		Is there NOL? true
		Schedule A is [null,-8300,1000,0,1000,0,5950,425,425,5525,0,0,2000,2000,0,1000,null,0,null,null,0,0,1000,0,0,-1775]
		The total NOL: 1775
		The new NOL is -1775
	*/


//============================================================================
// 2010 NOL CALCULATION. Use for code verification.
//============================================================================

/**
 *  2010 federal form 1040 line item values that we need to calculate the NOL.
 *
 *  i8a is form 1040 line 8a.
 *  i13 is the capital gains/loss, form 1040 line 13
 *	i40stdDed is form 1040 line 40, the standard deduction
 *	i41 is form 1040 line 41
 * 	NOLfromPrevYears is the total NOL from previous years.
 */

f1040_2010 = {
	year: 2010,
	i8a : 27,
	i40stdDed : 11400,
	i41 : -149274,
	NOLfromPrevYears : 122767
}

/**
 *  Generate, from the 1040 form line item values, 
 *  the parameters for calculating the NOL.
 */
params2010 = setParams(f1040_2010)

/**
 *  Now calculate the NOL for 2010
 */
nol2010 = calcNOL(params2010)

/** returns:
	Is there NOL? true
	Schedule A is [null,-149274,0,0,0,0,11400,27,27,11373,0,0,0,0,0,0,null,0,null,null,0,0,0,0,122767,-15134]
	The total NOL: 137901
	The new NOL is -15134
	137901
*/


//============================================================================
// 2011 NOL CALCULATION
//============================================================================

/**
 *  2011 federal form 1040 line item values that we need to calculate the NOL.
 *
 *  i8a is form 1040 line 8a.
 *  i13 is the capital gains/loss, form 1040 line 13
 *	i40stdDed is form 1040 line 40, the standard deduction
 *	i41 is form 1040 line 41
 * 	NOLfromPrevYears is the total NOL from previous years.
 */

f1040_2011 = {
	year: 2011,
	i8a : 16+3113,	// $16 from BoA interest, probably. total $3129
	//i8a : 16,
	i13: -3000,	// Capital gain or (loss). Attach Schedule D if required. If not required, check here 
	i40stdDed : 11600,
	i41 : -155058,

	NOLfromPrevYears : params2010.totalNOL	// $137,901
	// NOLfromPrevYears : 137901
}


/**
 *  Generate, from the 1040 form line item values, 
 *  the parameters for calculating the NOL.
 */
params2011 = setParams(f1040_2011)

/**
 *  Now calculate the NOL for 2011
 */

nol2011 = calcNOL(params2011)
// could also do nol2011 = calcNOL(setParams(f1040_2011))

/* the result:
		The parameters:
		{"year":2011,"f1040_41":-155058,"nonBizDeductions":11600,"nonBizIncomeOtherThanCapGains":3129,"NOLfromPrevYears":137901,"notUsedByUs":0,"sa":[],"nonBizCapLossBeforeLimit":0,"nonBizCapGains":0,"bizCapLossBeforeLimit":0,"bizCapGains":0}
		Is there NOL? true
		Schedule A is [null,-155058,0,0,0,0,11600,3129,3129,8471,0,0,0,0,0,0,null,0,null,null,0,0,0,0,137901,-8686]
		The total NOL: 146587
		The new NOL is -8686
*/

//============================================================================
// 2012 NOL
//============================================================================

/**
 *  2012 federal form 1040 line item values that we need to calculate the NOL.
 *
 *  i8a is form 1040 line 8a.
 *  i13 is the capital gains/loss, form 1040 line 13
 *	i40stdDed is form 1040 line 40, the standard deduction
 *	i41 is form 1040 line 41
 * 	NOLfromPrevYears is the total NOL from previous years.
 */
f1040_2012 = {
	i8a : 9377,
	i40stdDed : 11900,
	i41 : -113785,
	NOLfromPrevYears : params2011.totalNOL
}

/**
 *  Generate, from the 1040 form line item values, 
 *  the parameters for calculating the NOL.
 */
params2012 = setParams(f1040_2012)
nol2012 = calcNOL(params2012)
// nol2012 = calcNOL(setParams(f1040_2012));

/*  The result:

		The parameters:
		{"f1040_41":-113785,"nonBizDeductions":11900,"nonBizIncomeOtherThanCapGains":9377,"NOLfromPrevYears":146587,"notUsedByUs":0,"sa":[],"nonBizCapLossBeforeLimit":0,"nonBizCapGains":0,"bizCapLossBeforeLimit":0,"bizCapGains":0}
		Is there NOL? false
		Schedule A is [null,-113785,0,0,0,0,11900,9377,9377,2523,0,0,0,0,0,0,null,0,null,null,0,0,0,0,146587,35325]
		The total NOL: 146587
		there is no new NOL; sa[25] is > 0, it is 35325

*/


//=======================================================
//
//		MAIN CODE TO CALCULATE NOL
//
// Code to calculate the NOL for a given year based on
// values provided from Form 1040. This is sufficient
// for our needs but should not be considered a complete
// solution for any other scenario.
//=======================================================

/**
 *  For logging output to a string instead of to the console.
 */

var logString = ""
function consolelog(str) {
	console.log(str)
	logString += str + "\n"
}

/**
 *  Calculate the NOL based on the instructions in IRS form xxx.
 */
function calcNOL(params) {
	var sa = params.sa // schedule A parameters

	sa[1] = params.f1040_41
	sa[2] = params.nonBizCapLossBeforeLimit	// loss should be entered as a positive number
	sa[3] = params.nonBizCapGains	// positive number, obviously
	// sa[4] = (sa[2] > sa[3])? (sa[2]-sa[3]) : 0
	sa[4] = Math.max((sa[2]-sa[3]),0)	// netNonBizCapLoss. net non-biz cap loss, if any. otherwise 0.


	sa[5] = Math.max( (sa[3] - sa[2]), 0)	// netNonBizCapGain. net non-biz cap gain, if any. otherwise 0.

	sa[6] = params.nonBizDeductions			// enter as positive number. this is usually the standard deduction
	sa[7] = params.nonBizIncomeOtherThanCapGains	// like interest income.
	sa[8] = sa[5] + sa[7]	// net non biz cap gain (if any) + interest (& other?) income. what about abutter payment of $3000? where would that figure in?
		// netNonBizCapGainAndnonBizIncome

	sa[9] = Math.max((sa[6]-sa[8]),0)	// stdDed - netNonBizCapGainAndnonBizIncome
		// diff between the std dev and the income other than cap gain (non-biz)
																		// std ded - (net non-biz cap gain + interest etc.)
	sa[10] = Math.max((sa[8] - sa[6]), 0) // (net non-biz cap gain + interest etc.) - std ded
			// netNonBizCapGainAndnonBizIncome - stdDed
			// this is if the std dev is less than the other income
	
	sa[10] = Math.min(sa[5], sa[10])	// use the min of the net non-biz cap gain or above.
		// don't understand this.
	
	// netNonBizCapGain > (nonBizCapGain + nonBizIncomeOtherThanCapGains - stdDed)?
	// or
	// 0 > (nonBizIncomeOtherThanCapGains - stdDed)?

	sa[11] = params.bizCapLossBeforeLimit	// enter as a positive number
	sa[12] = params.bizCapGains	// positive number, obviously

	sa[13] = sa[10] + sa[12]

	// sa[14] = (sa[11]-sa[13]) >0? (sa[11]-sa[13]):0
	sa[14] = Math.max((sa[11]-sa[13]),0)

	sa[15] = sa[4] + sa[14]
	sa[20] = 0

	sa[22] = sa[15] - sa[20]
	// sa[22] = min(sa[15] - sa[20], 0)	// use only if there's a loss

	sa[17] = sa[21] = sa[23] = params.notUsedByUs
	sa[24] = params.NOLfromPrevYears	// enter as a positive number
							// saCalc = sa[1] + sa[9] + sa[17] + sa[21] + sa[22] + sa[23] + sa[24]
	sa[25] = sa[1] + sa[9] + sa[17] + sa[21] + sa[22] + sa[23] + sa[24]
	isThereNOL = sa[25] < 0
	consolelog("Is there NOL? " + isThereNOL);
	consolelog("Schedule A is " + JSON.stringify(sa));
	totNOL = isThereNOL? (sa[24]+ -sa[25]) : sa[24]
	consolelog("The total NOL: " + totNOL);
	if (isThereNOL) {
		sa[26] = totNOL
		consolelog("The new NOL is " + sa[25])
	} else {
		sa[26] = 0
		consolelog("there is no new NOL; sa[25] is > 0, it is " + sa[25]);
	}
	params.totalNOL = sa[26]
	return sa[26]
}


/**
 *  set the parameters for the Schedule A NOL calculation 
 *  based on the parameters in the federal 1040
 */
function setParams(f1040) {
	logString = ""	// reset the log.
	var params = {
		year : f1040.year,
		f1040_41 : f1040.i41,	// sa[1]
		nonBizDeductions : f1040.i40stdDed,	// sa[6]

		// 1040 8a interest
		nonBizIncomeOtherThanCapGains : f1040.i8a,	// sa[7]	// interest?

		NOLfromPrevYears : f1040.NOLfromPrevYears,	// sa[24]
		notUsedByUs : 0,
		sa : [],
		
		// non-biz cap loss & gains
		nonBizCapLossBeforeLimit : 0, // sa[2]
		nonBizCapGains : 0, // sa[3]

		// biz cap loss and gains
		bizCapLossBeforeLimit : 0, // sa[11]
		bizCapGains : 0	// sa[12]
	}
	consolelog("The parameters:\n" + JSON.stringify(params))
	return params
}

/**
 *  Schedule A Form 1045, item number descriptions
 */
sad = [
	"0 n/a",
	"1 Enter the amount from your 2011 Form 1040, line 41, or Form 1040NR, line 39. Estates and trusts, enter taxable income increased by the total of the charitable deduction, income distribution deduction, and exemption amount",
	"2 Nonbusiness capital losses before limitation. Enter as a positive number",
	"3 Nonbusiness capital gains (without regard to any section 1202 exclusion)",
	"4 If line 2 is more than line 3, enter the difference. Otherwise, enter -0-",
	"5 If line 3 is more than line 2, enter the difference.",
	"6 Nonbusiness deductions (see instructions) . . . . . . . . . . . 6",
	"7 Nonbusiness income other than capital gains (see instructions) . . . . . . . . . . . . 7",
	"8 Add lines 5 and 7 . . . . . . . . . . . . . . . . . . . 8",
	"9 If line 6 is more than line 8, enter the difference. Otherwise, enter -0- . . . . . . . . . . 9",
	"10 If line 8 is more than line 6, enter the difference. Otherwise, enter -0-. But do not enter morethan line 5 . . . . . . . . . . . . 10",
	"11 Business capital losses before limitation. Enter as a positive number . . 11",
	"12 Business capital gains (without regard to any section 1202 exclusion) . . . . . . . . 12",
	"13 Add lines 10 and 12 . . . . . . . . . . . . . . . . . . 13",
	"14 Subtract line 13 from line 11. If zero or less, enter -0- . . . . . . . 14",
	"15 Add lines 4 and 14 . . . . . . . . . . . . . . . . . . . 15",
	"16 Enter the loss, if any, from line 16 of your 2011 Schedule D (Form 1040). (Estates and trusts, enter the loss, if any, from line 15, column (3), of Schedule D (Form 1041).) Enter as a positive number. If you do not have a loss on that line (and do not have a section 1202 exclusion), skip lines 16 through 21 and enter on line 22 the amount from line 15 . . . . . . 16",
	"17 Section 1202 exclusion. Enter as a positive number . . . . . . . . . . . . . . . . 17",
	"18 Subtract line 17 from line 16. If zero or less, enter -0- . . . . . . . 18",
	"19 Enter the loss, if any, from line 21 of your 2011 Schedule D (Form 1040). (Estates and trusts, enter the loss, if any, from line 16 of Schedule D (Form 1041).) Enter as a positive number . . . . . . . . . . . . . 19",
	"20 If line 18 is more than line 19, enter the difference. Otherwise, enter -0- . 20",
	"21 If line 19 is more than line 18, enter the difference. Otherwise, enter -0- . . . . . . . . . 21",
	"22 Subtract line 20 from line 15. If zero or less, enter -0- . . . . . . . . . . . . . . . 22",
	"23 Domestic production activities deduction from your 2011 Form 1040, line 35, or Form 1040NR, line 34 (or included on Form 1041, line 15a) . . . . . . . . . . . . . . . . . . . . 23",
	"24 NOL deduction for losses from other years. Enter as a positive number . . . . . . . . . 24",
	"25 NOL. Combine lines 1, 9, 17, and 21 through 24. If the result is less than zero, enter it here and on page 1, line 1a. If the result is zero or more, you do not have an NOL"
]




//======================================================

/*
stdDed =
var paramsBase = {
	f1040_41 : ,	// sa[1]
	nonBizCapLossBeforeLimit : , // sa[2]
	nonBizCapGains : , // sa[3]
	bizCapLossBeforeLimit : , // sa[11]
	bizCapGains : ,	// sa[12]
	nonBizDeductions : stdDed,	// sa[6]
	nonBizIncomeOtherThanCapGains : ,	// sa[7]
	NOLfromPrevYears : ,	// sa[24]
	notUsedByUs : 0,
	sa : []
}
*/



/*
					sa[1] = params.f1040_41
					sa[2] = params.nonBizCapLossBeforeLimit
					sa[3] = params.nonBizCapGains
					sa[6] = params.nonBizDeductions
					sa[7] = params.nonBizIncomeOtherThanCapGains
					sa[11] = params.bizCapLossBeforeLimit
					sa[12] = params.bizCapGains
					sa[24] = params.NOLfromPrevYears
*/

sa = params2010; params2010.sa = []; nol2010 = calcNOL(params2010)

// calculate the NOL for a year given the parameters. This is based on the Schedule A form. For our puposes, there should be no more parameters necessary than what we're using in the function below.




// ]



------------------



// parameters needed by the Schedule A. this is what setParams() should return.
/*
var params2010 = {
	f1040_41 : -149274,	// sa[1]
	nonBizDeductions : stdDed2010,	// sa[6]

	// non-biz cap loss & gains
	nonBizCapLossBeforeLimit : 0, // sa[2]
	nonBizCapGains : 0, // sa[3]

	// 1040 8a interest
	nonBizIncomeOtherThanCapGains : 27,	// sa[7]	// interest?

	// biz cap loss and gains
	bizCapLossBeforeLimit : 0, // sa[11]
	bizCapGains : 0,	// sa[12]

	NOLfromPrevYears : 122767,	// sa[24]
	notUsedByUs : 0,
	sa : []
}
*/




// nonBizCapLossBeforeLimit reduces the new total nol because it doesn't have capital gains to offset it.
// the logic is something like that.

calcNOL(
{
 "year":2011,
 "f1040_41":-155058,
 "nonBizDeductions":11600,
 "nonBizIncomeOtherThanCapGains":40129, // 3129,
 "NOLfromPrevYears":137901,
 "notUsedByUs":0,
 "sa":[],
 "nonBizCapLossBeforeLimit":0,
 "nonBizCapGains":0,
 "bizCapLossBeforeLimit":0,
 "bizCapGains":0
}
)


// {i8a: 3129, i40stdDed: 11600, i41: -155058, NOLfromPrevYears: 137901}

//f1040_2011.i8a = 16;
//params2011.nonBizCapGains = 3113;
//params2011.bizCapGains = 3113	// sa[12]

// JSON.stringify(params2011)
// "{"f1040_41":-155058,"nonBizDeductions":11600,"nonBizIncomeOtherThanCapGains":3129,"NOLfromPrevYears":137901,"notUsedByUs":0,"sa":[],"nonBizCapLossBeforeLimit":0,"nonBizCapGains":0,"bizCapLossBeforeLimit":0,"bizCapGains":0}"




JSON.stringify(params2011)
"{"f1040_41":-155058,"nonBizDeductions":11600,"nonBizIncomeOtherThanCapGains":3129,"NOLfromPrevYears":137901,"notUsedByUs":0,"sa":[null,-155058,0,0,0,0,11600,3129,3129,8471,0,0,0,0,0,0,null,0,null,null,0,0,0,0,137901,-8686,146587],"nonBizCapLossBeforeLimit":0,"nonBizCapGains":0,"bizCapLossBeforeLimit":0,"bizCapGains":0,"totalNOL":146587}"




nol2012 = calcNOL(
	setParams(
	{
		i8a : 9396,
		i40stdDed : 11900,
		i41 : -113766,
		NOLfromPrevYears : params2011.totalNOL
	}	
))


JSON.stringify(params2012)
"{"f1040_41":-113766,"nonBizDeductions":11900,"nonBizIncomeOtherThanCapGains":9396,"NOLfromPrevYears":146587,"notUsedByUs":0,"sa":[null,-113766,0,0,0,0,11900,9396,9396,2504,0,0,0,0,0,0,null,0,null,null,0,0,0,0,146587,35325,0],"nonBizCapLossBeforeLimit":0,"nonBizCapGains":0,"bizCapLossBeforeLimit":0,"bizCapGains":0,"totalNOL":0}"


//-----------------------------------
// The results:
//-----------------------------------


JSON.stringify(params2010)
"{"f1040_41":-149274,"nonBizDeductions":11400,"nonBizCapLossBeforeLimit":0,"nonBizCapGains":0,"nonBizIncomeOtherThanCapGains":27,"bizCapLossBeforeLimit":0,"bizCapGains":0,"NOLfromPrevYears":122767,"notUsedByUs":0,"sa":[null,-149274,0,0,0,0,11400,27,27,11373,0,0,0,0,0,0,null,0,null,null,0,0,0,0,122767,-15134,137901],"totalNOL":137901}"

