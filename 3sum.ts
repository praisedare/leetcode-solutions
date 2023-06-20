function threeSum(nums: number[]): number[][] {
    let tripletIdxs: number[][] = []

    for (let i = 0; i < nums.length; i++) {
        let target = -nums[i]
        let targetSumIdxs = twoSum(nums, target, i)
        if (targetSumIdxs) {
            let t = new Set([i, ...targetSumIdxs])
            if (t.size == 3)
                tripletIdxs.push([...t.values()])
        }
    }

    console.log('tripletIdxs', tripletIdxs)
    return uniqify(tripletIdxs.map(triplet => triplet.map(i => nums[i]).sort(comparator)))
};

function twoSum(nums: number[], target: number, originalExcludeIdx: number)
: [number, number] | null
{
    let sorted = [...nums].sort(comparator)

    let excludeIdx = sorted.indexOf(nums[originalExcludeIdx])

    let a = 0,
        b = nums.length - 1;
   
    a = a == excludeIdx ? a + 1 : a;
    b = b == excludeIdx ? b - 1 : b;

    let sum = sorted[a] + sorted[b]

    while (sum != target && a < b) {
        if (sum < target) {
            a++
            if (a == excludeIdx)
                a++
        } else {
            b--
            if (b == excludeIdx)
                b--
        }
        sum = sorted[a] + sorted[b]
    }

    if (a >= b || sum != target) {
        console.log('breaking', a, b, sum, target, '\n')
        return null
    }

    let idxA = nums.indexOf(sorted[a]),
        idxB = sorted[a] == sorted[b]
            ? nums.indexOf(sorted[a], a + 1)
            : nums.indexOf(sorted[b])

    console.log('idxA', idxA, 'idxB', idxB)
    if (idxA < 0 || idxB < 0) {
        console.log('cannot return pair\n')
        return null
    }
    console.log('returned pair\n')
    return [idxA, idxB]
}

const comparator = (a: number, b: number) => a - b

const uniqify = (arr: number[][]) => {
    let s: Set<string> = new Set
    for (let nums of arr)
        s.add(nums.join(','))
    return [...s.values()].map(v => v.split(',').map(n => +n))
}

