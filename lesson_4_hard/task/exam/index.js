let start, end;

function sum(number) {
    let total = 0;
    for (let i = 1; i < number / 2 + 1; i++) {
        if (number % i == 0) {
            total+= i; 
        }
    }
    return total;
}
function getFriendlyNumbers(start, end) {

    if (start && end && 0 < start && start <= end && typeof(start + end) !== "string") {
        let arr = [];

        for (let i = start; i <= end; i++) {
            let sum1 = sum(i);

            if (start < sum1 && sum1 <= end) {
                let sum2 = sum(sum1);

                if (sum2 == i && i < sum1) {
                    arr.push([i, sum1]);
                }
            } else {
                continue;
            }
        }
        return arr;
    } else {
        return false;
    }
}
module.exports = {
    firstName: 'Roman',
    secondName: 'Dvorak',
    task: getFriendlyNumbers
};