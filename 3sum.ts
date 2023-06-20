function threeSum(nums: number[]): number[][] {
    nums.sort(sortFunc)

    let triplets: Set<string> = new Set

    for (let i = 0; i < nums.length; i++) {
        let j = i + 1,
            k = nums.length - 1
        let sum: number

        while (j < k) {
            sum = nums[i] + nums[j] + nums[k]
            if (sum == 0) { 
                addTriplet([nums[i], nums[j], nums[k]])
                j++
                k--
            } else if (sum < 0) {
                j++
            } else if (sum > 0) {
                k--
            }
        }
    }

    function addTriplet(triplet: number[]) {
        triplets.add(triplet.sort(sortFunc).join(','))
    }

    return [...triplets].map(t => t.split(',').map(n => +n))
};

const sortFunc = (a: number, b: number) => a - b

