import { Exercise } from '../models/content.models';

export const CODING_EXERCISES: Exercise[] = [
  {
    id: 'ex-01-reverse-string',
    slug: 'reverse-a-string',
    title: 'Reverse a String',
    description: 'Reverse the characters in a given string without using built-in Array.reverse().',
    difficulty: 'Beginner',
    topic: 'Strings & Iteration',
    category: 'JavaScript',
    problemStatement: 'Write a function `reverseString(str)` that takes a string input and returns the reversed string without mutating the input.',
    starterCode: `function reverseString(str) {
  // Return the reversed string
}`,
    language: 'javascript',
    exampleInput: 'reverseString("hello")',
    exampleOutput: '"olleh"',
    testCases: [
      { inputDescription: '"hello"', expectedOutputDescription: '"olleh"' },
      { inputDescription: '"CodeLearn"', expectedOutputDescription: '"nraeLedoC"' },
      { inputDescription: '"" (empty string)', expectedOutputDescription: '""' }
    ],
    hints: [
      'You can iterate backwards from str.length - 1 down to 0.',
      'Alternatively, use the spread operator with reduce: `[...str].reduce((rev, char) => char + rev, "")`.'
    ],
    explanation: 'Iterating backwards over the characters or accumulating them into a new string avoids modifying the original value and demonstrates string indexing and accumulation.',
    solution: `function reverseString(str) {
  let reversed = '';
  for (let i = str.length - 1; i >= 0; i--) {
    reversed += str[i];
  }
  return reversed;
}`,
    relatedLessonSlug: 'javascript-functions'
  },
  {
    id: 'ex-02-find-max',
    slug: 'find-the-largest-number',
    title: 'Find the Largest Number in an Array',
    description: 'Identify the highest numerical value in an array of numbers.',
    difficulty: 'Beginner',
    topic: 'Arrays',
    category: 'JavaScript',
    problemStatement: 'Write a function `findMax(nums)` that returns the maximum number in an array. If the array is empty, return undefined.',
    starterCode: `function findMax(nums) {
  // Return maximum number
}`,
    language: 'javascript',
    exampleInput: 'findMax([3, 7, 2, 9, 5])',
    exampleOutput: '9',
    testCases: [
      { inputDescription: '[3, 7, 2, 9, 5]', expectedOutputDescription: '9' },
      { inputDescription: '[-10, -5, -20]', expectedOutputDescription: '-5' },
      { inputDescription: '[]', expectedOutputDescription: 'undefined' }
    ],
    hints: [
      'Initialize a tracker variable with the first element of the array `nums[0]`, not 0, so negative numbers work.',
      'Compare each subsequent element against current max.'
    ],
    explanation: 'Starting with the first array element handles negative numbers cleanly without assuming zero as a floor.',
    solution: `function findMax(nums) {
  if (nums.length === 0) return undefined;
  let max = nums[0];
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] > max) {
      max = nums[i];
    }
  }
  return max;
}`,
    relatedLessonSlug: 'javascript-arrays'
  },
  {
    id: 'ex-03-palindrome-check',
    slug: 'check-palindrome',
    title: 'Check for Palindrome',
    description: 'Determine whether an alphanumeric string reads the same forwards and backwards, ignoring casing and non-alphanumeric symbols.',
    difficulty: 'Beginner',
    topic: 'Strings & Regular Expressions',
    category: 'JavaScript',
    problemStatement: 'Write a function `isPalindrome(str)` that returns true if the string is a palindrome after removing all non-alphanumeric characters and converting to lowercase.',
    starterCode: `function isPalindrome(str) {
  // Return boolean
}`,
    language: 'javascript',
    exampleInput: 'isPalindrome("A man, a plan, a canal: Panama")',
    exampleOutput: 'true',
    testCases: [
      { inputDescription: '"racecar"', expectedOutputDescription: 'true' },
      { inputDescription: '"A man, a plan, a canal: Panama"', expectedOutputDescription: 'true' },
      { inputDescription: '"hello"', expectedOutputDescription: 'false' }
    ],
    hints: [
      'Clean the string first with `str.toLowerCase().replace(/[^a-z0-9]/g, "")`.',
      'Use two pointers (one at the start, one at the end) moving inwards.'
    ],
    explanation: 'Sanitizing the string first isolates relevant characters. Using two pointers is efficient because it requires O(1) extra memory.',
    solution: `function isPalindrome(str) {
  const clean = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  let left = 0;
  let right = clean.length - 1;
  while (left < right) {
    if (clean[left] !== clean[right]) {
      return false;
    }
    left++;
    right--;
  }
  return true;
}`,
    relatedLessonSlug: 'javascript-functions'
  },
  {
    id: 'ex-04-count-vowels',
    slug: 'count-vowels',
    title: 'Count Vowels in a String',
    description: 'Count the total number of vowels (a, e, i, o, u) present in a given string regardless of casing.',
    difficulty: 'Beginner',
    topic: 'Strings & Sets',
    category: 'JavaScript',
    problemStatement: 'Write a function `countVowels(str)` that counts occurrences of "a", "e", "i", "o", and "u".',
    starterCode: `function countVowels(str) {
  // Return integer count
}`,
    language: 'javascript',
    exampleInput: 'countVowels("CodeLearn Academy")',
    exampleOutput: '7',
    testCases: [
      { inputDescription: '"hello world"', expectedOutputDescription: '3' },
      { inputDescription: '"xyz"', expectedOutputDescription: '0' },
      { inputDescription: '"AEIOU"', expectedOutputDescription: '5' }
    ],
    hints: [
      'Use a `Set` containing `"a", "e", "i", "o", "u"` for O(1) membership lookups.',
      'Remember to normalize the string with `.toLowerCase()`.'
    ],
    explanation: 'A Set lookup is concise and performs O(1) checks per character across the entire string length.',
    solution: `function countVowels(str) {
  const vowels = new Set(['a', 'e', 'i', 'o', 'u']);
  let count = 0;
  for (const char of str.toLowerCase()) {
    if (vowels.has(char)) {
      count++;
    }
  }
  return count;
}`,
    relatedLessonSlug: 'javascript-variables'
  },
  {
    id: 'ex-05-remove-duplicates',
    slug: 'remove-duplicates-from-array',
    title: 'Remove Duplicates from an Array',
    description: 'Return a new array containing only the unique elements of the input array while preserving the original order of first appearance.',
    difficulty: 'Beginner',
    topic: 'Arrays & Sets',
    category: 'JavaScript',
    problemStatement: 'Write a function `removeDuplicates(arr)` that returns an array with duplicate values filtered out.',
    starterCode: `function removeDuplicates(arr) {
  // Return unique array
}`,
    language: 'javascript',
    exampleInput: 'removeDuplicates([1, 2, 2, 3, 4, 4, 1, 5])',
    exampleOutput: '[1, 2, 3, 4, 5]',
    testCases: [
      { inputDescription: '[1, 2, 2, 3]', expectedOutputDescription: '[1, 2, 3]' },
      { inputDescription: '["a", "b", "a"]', expectedOutputDescription: '["a", "b"]' },
      { inputDescription: '[]', expectedOutputDescription: '[]' }
    ],
    hints: [
      'In ES6, `Set` objects automatically enforce element uniqueness.',
      'You can convert a Set back into an array with `[...new Set(arr)]`.'
    ],
    explanation: 'Passing an array to `new Set()` strips duplicate primitives in O(n) time. The spread operator recreates the array preserving insertion order.',
    solution: `function removeDuplicates(arr) {
  return [...new Set(arr)];
}`,
    relatedLessonSlug: 'javascript-arrays'
  },
  {
    id: 'ex-06-fizzbuzz',
    slug: 'fizzbuzz-generator',
    title: 'Classic FizzBuzz Generator',
    description: 'Generate the numbers from 1 to N, replacing multiples of 3 with "Fizz", multiples of 5 with "Buzz", and multiples of both with "FizzBuzz".',
    difficulty: 'Beginner',
    topic: 'Control Flow & Modulo',
    category: 'JavaScript',
    problemStatement: 'Write a function `fizzBuzz(n)` returning an array of string representations of numbers from 1 to n with Fizz/Buzz rules applied.',
    starterCode: `function fizzBuzz(n) {
  // Return array of strings
}`,
    language: 'javascript',
    exampleInput: 'fizzBuzz(5)',
    exampleOutput: '["1", "2", "Fizz", "4", "Buzz"]',
    testCases: [
      { inputDescription: '5', expectedOutputDescription: '["1", "2", "Fizz", "4", "Buzz"]' },
      { inputDescription: '15', expectedOutputDescription: 'Last item is "FizzBuzz"' }
    ],
    hints: [
      'Check for divisibility by 15 (both 3 and 5) first, or concatenate strings: if `% 3 === 0` add "Fizz", if `% 5 === 0` add "Buzz".'
    ],
    explanation: 'Testing `% 15 === 0` first or building the string conditionally avoids missing the combined case.',
    solution: `function fizzBuzz(n) {
  const result = [];
  for (let i = 1; i <= n; i++) {
    let entry = '';
    if (i % 3 === 0) entry += 'Fizz';
    if (i % 5 === 0) entry += 'Buzz';
    result.push(entry || String(i));
  }
  return result;
}`,
    relatedLessonSlug: 'javascript-functions'
  },
  {
    id: 'ex-07-sum-array',
    slug: 'sum-array-elements',
    title: 'Sum All Numbers in an Array',
    description: 'Calculate the total sum of all numbers in an array using the functional reduce pattern.',
    difficulty: 'Beginner',
    topic: 'Arrays & Reduce',
    category: 'JavaScript',
    problemStatement: 'Write a function `sumArray(numbers)` that returns the numeric total. For an empty array, return 0.',
    starterCode: `function sumArray(numbers) {
  // Return total sum
}`,
    language: 'javascript',
    exampleInput: 'sumArray([10, 20, 30])',
    exampleOutput: '60',
    testCases: [
      { inputDescription: '[1, 2, 3, 4]', expectedOutputDescription: '10' },
      { inputDescription: '[]', expectedOutputDescription: '0' },
      { inputDescription: '[-5, 5]', expectedOutputDescription: '0' }
    ],
    hints: [
      'Use `numbers.reduce((acc, curr) => acc + curr, 0)`.',
      'Always supply the initial value 0 so empty arrays do not throw a TypeError.'
    ],
    explanation: 'Array.reduce iteratively rolls each element into an accumulator starting with the initial value of 0.',
    solution: `function sumArray(numbers) {
  return numbers.reduce((acc, curr) => acc + curr, 0);
}`,
    relatedLessonSlug: 'javascript-arrays'
  },
  {
    id: 'ex-08-title-case',
    slug: 'convert-to-title-case',
    title: 'Convert a String to Title Case',
    description: 'Format a sentence such that the first letter of each word is capitalized and remaining letters are lowercase.',
    difficulty: 'Beginner',
    topic: 'Strings & Transformation',
    category: 'JavaScript',
    problemStatement: 'Write a function `titleCase(sentence)` that capitalizes the first character of every word separated by spaces.',
    starterCode: `function titleCase(sentence) {
  // Return title-cased sentence
}`,
    language: 'javascript',
    exampleInput: 'titleCase("learning ANGULAR and typescript")',
    exampleOutput: '"Learning Angular And Typescript"',
    testCases: [
      { inputDescription: '"hello world"', expectedOutputDescription: '"Hello World"' },
      { inputDescription: '"a quick brown fox"', expectedOutputDescription: '"A Quick Brown Fox"' }
    ],
    hints: [
      'Split the sentence into words using `.split(" ")`.',
      'Transform each word with `word[0].toUpperCase() + word.slice(1).toLowerCase()`.',
      'Rejoin with `.join(" ")`.'
    ],
    explanation: 'Splitting by whitespace allows isolating each token to standardize casing before recombining into the finished sentence.',
    solution: `function titleCase(sentence) {
  if (!sentence) return '';
  return sentence
    .split(' ')
    .filter(word => word.length > 0)
    .map(word => word[0].toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}`,
    relatedLessonSlug: 'javascript-variables'
  },
  {
    id: 'ex-09-chunk-array',
    slug: 'chunk-an-array',
    title: 'Chunk an Array into Groups of Size N',
    description: 'Split an array into smaller sub-arrays, each of maximum length specified by the chunk size.',
    difficulty: 'Intermediate',
    topic: 'Arrays & Slicing',
    category: 'JavaScript',
    problemStatement: 'Write a function `chunk(arr, size)` that returns an array of chunks.',
    starterCode: `function chunk(arr, size) {
  // Return chunked array
}`,
    language: 'javascript',
    exampleInput: 'chunk([1, 2, 3, 4, 5], 2)',
    exampleOutput: '[[1, 2], [3, 4], [5]]',
    testCases: [
      { inputDescription: '[1, 2, 3, 4], 2', expectedOutputDescription: '[[1, 2], [3, 4]]' },
      { inputDescription: '[1, 2, 3], 5', expectedOutputDescription: '[[1, 2, 3]]' }
    ],
    hints: [
      'Use a `for` loop that increments by `size` on each iteration: `for (let i = 0; i < arr.length; i += size)`.',
      'Slice portions of the array with `arr.slice(i, i + size)`.'
    ],
    explanation: 'Incrementing loop index by chunk size and taking slices neatly handles arbitrary remainders in the final chunk.',
    solution: `function chunk(arr, size) {
  if (size <= 0) return [];
  const chunked = [];
  for (let i = 0; i < arr.length; i += size) {
    chunked.push(arr.slice(i, i + size));
  }
  return chunked;
}`,
    relatedLessonSlug: 'javascript-arrays'
  },
  {
    id: 'ex-10-object-keys-count',
    slug: 'count-object-properties',
    title: 'Count Properties in an Object',
    description: 'Count the number of own enumerable properties in an object.',
    difficulty: 'Beginner',
    topic: 'Objects',
    category: 'JavaScript',
    problemStatement: 'Write a function `countProperties(obj)` that returns the count of own keys in a JavaScript object.',
    starterCode: `function countProperties(obj) {
  // Return key count
}`,
    language: 'javascript',
    exampleInput: 'countProperties({ name: "Alex", role: "Instructor", active: true })',
    exampleOutput: '3',
    testCases: [
      { inputDescription: '{ a: 1, b: 2 }', expectedOutputDescription: '2' },
      { inputDescription: '{}', expectedOutputDescription: '0' }
    ],
    hints: [
      'Native `Object.keys(obj)` returns an array of own enumerable keys.',
      'Check its `.length` property.'
    ],
    explanation: 'Object.keys() ignores inherited prototype properties and returns an array of keys whose length represents property count.',
    solution: `function countProperties(obj) {
  if (!obj || typeof obj !== 'object') return 0;
  return Object.keys(obj).length;
}`,
    relatedLessonSlug: 'javascript-objects'
  },
  {
    id: 'ex-11-filter-evens',
    slug: 'filter-even-numbers',
    title: 'Filter Even Numbers from Array',
    description: 'Use Array.filter to return only the even integers from a numerical collection.',
    difficulty: 'Beginner',
    topic: 'Arrays & Predicates',
    category: 'JavaScript',
    problemStatement: 'Write a function `filterEvens(numbers)` that returns an array with only even numbers.',
    starterCode: `function filterEvens(numbers) {
  // Return evens
}`,
    language: 'javascript',
    exampleInput: 'filterEvens([1, 2, 3, 4, 5, 6])',
    exampleOutput: '[2, 4, 6]',
    testCases: [
      { inputDescription: '[1, 3, 5]', expectedOutputDescription: '[]' },
      { inputDescription: '[2, 4, 8]', expectedOutputDescription: '[2, 4, 8]' }
    ],
    hints: ['Check if `num % 2 === 0` inside the filter callback.'],
    explanation: 'Filter takes a boolean predicate and retains elements that return true without mutating the original array.',
    solution: `function filterEvens(numbers) {
  return numbers.filter(n => n % 2 === 0);
}`,
    relatedLessonSlug: 'javascript-arrays'
  },
  {
    id: 'ex-12-find-longest-word',
    slug: 'find-longest-word',
    title: 'Find Longest Word in a Sentence',
    description: 'Locate the word with the maximum character length in a sentence.',
    difficulty: 'Beginner',
    topic: 'Strings & Iteration',
    category: 'JavaScript',
    problemStatement: 'Write a function `findLongestWord(sentence)` that returns the longest word as a string.',
    starterCode: `function findLongestWord(sentence) {
  // Return longest word
}`,
    language: 'javascript',
    exampleInput: 'findLongestWord("The quick brown fox jumps over the lazy dog")',
    exampleOutput: '"jumps"',
    testCases: [
      { inputDescription: '"Web development is fascinating"', expectedOutputDescription: '"development"' }
    ],
    hints: ['Split the sentence into words and reduce or sort by length.'],
    explanation: 'Iterating through words and updating the champion longest word when word.length exceeds current longest runs in O(n) time.',
    solution: `function findLongestWord(sentence) {
  const words = sentence.split(' ');
  let longest = '';
  for (const word of words) {
    if (word.length > longest.length) {
      longest = word;
    }
  }
  return longest;
}`,
    relatedLessonSlug: 'javascript-functions'
  },
  {
    id: 'ex-13-anagram-check',
    slug: 'check-anagram',
    title: 'Check if Two Strings are Anagrams',
    description: 'Verify if two strings contain identical characters with identical frequencies in any order.',
    difficulty: 'Beginner',
    topic: 'Strings & Hash Frequency',
    category: 'JavaScript',
    problemStatement: 'Write a function `isAnagram(str1, str2)` that returns true if the words are anagrams.',
    starterCode: `function isAnagram(str1, str2) {
  // Return boolean
}`,
    language: 'javascript',
    exampleInput: 'isAnagram("listen", "silent")',
    exampleOutput: 'true',
    testCases: [
      { inputDescription: '"anagram", "nagaram"', expectedOutputDescription: 'true' },
      { inputDescription: '"rat", "car"', expectedOutputDescription: 'false' }
    ],
    hints: [
      'If their lengths differ, they cannot be anagrams.',
      'Sort characters: `str.split("").sort().join("")` and compare equality.'
    ],
    explanation: 'Sorting standardizes the character sequence so identical letter counts produce identical strings.',
    solution: `function isAnagram(str1, str2) {
  const clean1 = str1.toLowerCase().replace(/[^a-z0-9]/g, '');
  const clean2 = str2.toLowerCase().replace(/[^a-z0-9]/g, '');
  if (clean1.length !== clean2.length) return false;
  return clean1.split('').sort().join('') === clean2.split('').sort().join('');
}`,
    relatedLessonSlug: 'javascript-functions'
  },
  {
    id: 'ex-14-factorial',
    slug: 'calculate-factorial',
    title: 'Calculate Factorial of a Number',
    description: 'Compute n! for any non-negative integer n.',
    difficulty: 'Beginner',
    topic: 'Math & Recursion',
    category: 'JavaScript',
    problemStatement: 'Write a function `factorial(n)` where 0! = 1 and n! = n * (n - 1) * ... * 1.',
    starterCode: `function factorial(n) {
  // Return n!
}`,
    language: 'javascript',
    exampleInput: 'factorial(5)',
    exampleOutput: '120',
    testCases: [
      { inputDescription: '0', expectedOutputDescription: '1' },
      { inputDescription: '4', expectedOutputDescription: '24' }
    ],
    hints: ['Base case is `n <= 1 ? 1 : ...` or loop from 2 to n.'],
    explanation: 'An iterative loop from 2 up to n avoids call stack limits for larger numbers.',
    solution: `function factorial(n) {
  if (n < 0) return undefined;
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}`,
    relatedLessonSlug: 'javascript-functions'
  },
  {
    id: 'ex-15-fibonacci',
    slug: 'generate-nth-fibonacci',
    title: 'Generate Nth Fibonacci Number',
    description: 'Calculate the Nth number in the Fibonacci sequence (0, 1, 1, 2, 3, 5, 8, ...).',
    difficulty: 'Beginner',
    topic: 'Math & Iteration',
    category: 'JavaScript',
    problemStatement: 'Write `fibonacci(n)` where fib(0)=0, fib(1)=1, and fib(n)=fib(n-1)+fib(n-2).',
    starterCode: `function fibonacci(n) {
  // Return Nth fibonacci
}`,
    language: 'javascript',
    exampleInput: 'fibonacci(6)',
    exampleOutput: '8',
    testCases: [
      { inputDescription: '0', expectedOutputDescription: '0' },
      { inputDescription: '1', expectedOutputDescription: '1' },
      { inputDescription: '7', expectedOutputDescription: '13' }
    ],
    hints: ['Iterative tracking with two variables `a = 0, b = 1` prevents exponential time complexity.'],
    explanation: 'Using two rolling variables computes the sequence in O(n) time and O(1) space.',
    solution: `function fibonacci(n) {
  if (n <= 0) return 0;
  if (n === 1) return 1;
  let prev = 0;
  let curr = 1;
  for (let i = 2; i <= n; i++) {
    const next = prev + curr;
    prev = curr;
    curr = next;
  }
  return curr;
}`,
    relatedLessonSlug: 'javascript-functions'
  },
  {
    id: 'ex-16-truncate-string',
    slug: 'truncate-string-with-ellipsis',
    title: 'Truncate String with Ellipsis',
    description: 'Shorten a string to a specified max length and append "..." if truncated.',
    difficulty: 'Beginner',
    topic: 'Strings',
    category: 'JavaScript',
    problemStatement: 'Write `truncate(str, maxLength)` which appends "..." only if the string exceeds maxLength.',
    starterCode: `function truncate(str, maxLength) {
  // Return truncated string
}`,
    language: 'javascript',
    exampleInput: 'truncate("CodeLearn Academy is great", 12)',
    exampleOutput: '"CodeLearn Ac..."',
    testCases: [
      { inputDescription: '"Hello", 10', expectedOutputDescription: '"Hello"' },
      { inputDescription: '"Angular Framework", 7', expectedOutputDescription: '"Angular..."' }
    ],
    hints: ['Check `str.length > maxLength ? str.slice(0, maxLength) + "..." : str`.'],
    explanation: 'Comparing string length against limit prevents unnecessary slicing and preserves short strings.',
    solution: `function truncate(str, maxLength) {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength) + '...';
}`,
    relatedLessonSlug: 'javascript-variables'
  },
  {
    id: 'ex-17-merge-sorted-arrays',
    slug: 'merge-two-sorted-arrays',
    title: 'Merge Two Sorted Arrays',
    description: 'Combine two pre-sorted numerical arrays into a single combined sorted array in O(n + m) time.',
    difficulty: 'Intermediate',
    topic: 'Two Pointers & Arrays',
    category: 'JavaScript',
    problemStatement: 'Write `mergeSorted(arr1, arr2)` that returns a combined sorted array without calling Array.sort().',
    starterCode: `function mergeSorted(arr1, arr2) {
  // Return merged array
}`,
    language: 'javascript',
    exampleInput: 'mergeSorted([1, 3, 5], [2, 4, 6])',
    exampleOutput: '[1, 2, 3, 4, 5, 6]',
    testCases: [
      { inputDescription: '[1, 5], [2, 3, 8]', expectedOutputDescription: '[1, 2, 3, 5, 8]' }
    ],
    hints: ['Use two pointer indices `i` and `j` comparing elements at each step.'],
    explanation: 'The two-pointer technique avoids the O((n+m) log(n+m)) overhead of sorting by taking advantage of pre-sorted order.',
    solution: `function mergeSorted(arr1, arr2) {
  const merged = [];
  let i = 0;
  let j = 0;
  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] <= arr2[j]) {
      merged.push(arr1[i]);
      i++;
    } else {
      merged.push(arr2[j]);
      j++;
    }
  }
  while (i < arr1.length) {
    merged.push(arr1[i]);
    i++;
  }
  while (j < arr2.length) {
    merged.push(arr2[j]);
    j++;
  }
  return merged;
}`,
    relatedLessonSlug: 'javascript-arrays'
  },
  {
    id: 'ex-18-array-flatten-shallow',
    slug: 'flatten-array-shallow',
    title: 'Flatten Array by One Depth Level',
    description: 'Flatten a nested array by exactly one level without calling Array.flat().',
    difficulty: 'Beginner',
    topic: 'Arrays',
    category: 'JavaScript',
    problemStatement: 'Write `flattenShallow(arr)` that expands one layer of inner array nesting.',
    starterCode: `function flattenShallow(arr) {
  // Return flattened array
}`,
    language: 'javascript',
    exampleInput: 'flattenShallow([[1, 2], [3], 4, [5, 6]])',
    exampleOutput: '[1, 2, 3, 4, 5, 6]',
    testCases: [
      { inputDescription: '[[1], [2, [3]]]', expectedOutputDescription: '[1, 2, [3]]' }
    ],
    hints: ['Use `arr.reduce((acc, item) => acc.concat(item), [])`.'],
    explanation: 'Array.prototype.concat automatically unpacks one level of array arguments into the target array.',
    solution: `function flattenShallow(arr) {
  return arr.reduce((acc, item) => acc.concat(item), []);
}`,
    relatedLessonSlug: 'javascript-arrays'
  },
  {
    id: 'ex-19-object-invert',
    slug: 'invert-object-keys-values',
    title: 'Invert Keys and Values of an Object',
    description: 'Create an object where the original keys become values and original values become keys.',
    difficulty: 'Beginner',
    topic: 'Objects',
    category: 'JavaScript',
    problemStatement: 'Write `invertObject(obj)` where `{ a: "x", b: "y" }` becomes `{ x: "a", y: "b" }`.',
    starterCode: `function invertObject(obj) {
  // Return inverted object
}`,
    language: 'javascript',
    exampleInput: 'invertObject({ a: "apple", b: "banana" })',
    exampleOutput: '{ apple: "a", banana: "b" }',
    testCases: [
      { inputDescription: '{ light: "white", dark: "black" }', expectedOutputDescription: '{ white: "light", black: "dark" }' }
    ],
    hints: ['Iterate with `Object.entries(obj)` and populate a new result object with `inverted[val] = key`.'],
    explanation: 'Object.entries gives `[key, value]` pairs, allowing straightforward swapping of keys and values.',
    solution: `function invertObject(obj) {
  const inverted = {};
  for (const [key, value] of Object.entries(obj)) {
    inverted[String(value)] = key;
  }
  return inverted;
}`,
    relatedLessonSlug: 'javascript-objects'
  },
  {
    id: 'ex-20-array-difference',
    slug: 'array-difference',
    title: 'Compute Difference Between Two Arrays',
    description: 'Return elements of the first array that do not exist in the second array.',
    difficulty: 'Beginner',
    topic: 'Arrays & Sets',
    category: 'JavaScript',
    problemStatement: 'Write `difference(arr1, arr2)` that excludes elements present in arr2.',
    starterCode: `function difference(arr1, arr2) {
  // Return difference
}`,
    language: 'javascript',
    exampleInput: 'difference([1, 2, 3, 4], [2, 4])',
    exampleOutput: '[1, 3]',
    testCases: [
      { inputDescription: '["a", "b", "c"], ["b"]', expectedOutputDescription: '["a", "c"]' }
    ],
    hints: ['Create a `Set` from arr2 for fast O(1) checks inside `arr1.filter()`.'],
    explanation: 'Wrapping the excluded array into a Set avoids O(n * m) nested array searches.',
    solution: `function difference(arr1, arr2) {
  const excludeSet = new Set(arr2);
  return arr1.filter(item => !excludeSet.has(item));
}`,
    relatedLessonSlug: 'javascript-arrays'
  },
  {
    id: 'ex-21-group-by-property',
    slug: 'group-by-property',
    title: 'Group Array of Objects by Property',
    description: 'Group items in an array of objects into categories based on a specific shared property key.',
    difficulty: 'Intermediate',
    topic: 'Objects & Data Transformation',
    category: 'JavaScript',
    problemStatement: 'Write `groupBy(items, key)` returning an object with keys mapped to arrays of matching objects.',
    starterCode: `function groupBy(items, key) {
  // Return grouped object
}`,
    language: 'javascript',
    exampleInput: 'groupBy([{ role: "admin", name: "A" }, { role: "user", name: "B" }, { role: "admin", name: "C" }], "role")',
    exampleOutput: '{ admin: [{ role: "admin", name: "A" }, { role: "admin", name: "C" }], user: [{ role: "user", name: "B" }] }',
    testCases: [
      { inputDescription: 'Grouping by category', expectedOutputDescription: 'Object with category keys' }
    ],
    hints: ['Use `items.reduce` initializing an empty object `{}` as accumulator.'],
    explanation: 'The reduce accumulator groups objects under matching key buckets cleanly.',
    solution: `function groupBy(items, key) {
  return items.reduce((acc, item) => {
    const groupKey = item[key];
    if (!acc[groupKey]) {
      acc[groupKey] = [];
    }
    acc[groupKey].push(item);
    return acc;
  }, {});
}`,
    relatedLessonSlug: 'javascript-objects'
  },
  {
    id: 'ex-22-query-string-parser',
    slug: 'parse-url-query-string',
    title: 'Parse URL Query String into Object',
    description: 'Convert a URL query string like "?page=2&sort=asc&filter=active" into a key-value object.',
    difficulty: 'Intermediate',
    topic: 'URL & Strings',
    category: 'JavaScript',
    problemStatement: 'Write `parseQueryString(queryString)` that parses params into an object using decodeURIComponent.',
    starterCode: `function parseQueryString(queryString) {
  // Return parsed object
}`,
    language: 'javascript',
    exampleInput: 'parseQueryString("?category=angular&level=beginner")',
    exampleOutput: '{ category: "angular", level: "beginner" }',
    testCases: [
      { inputDescription: '"?search=web%20dev"', expectedOutputDescription: '{ search: "web dev" }' },
      { inputDescription: '""', expectedOutputDescription: '{}' }
    ],
    hints: ['Remove leading "?" with `.replace(/^\\?/, "")`, split on `&`, then split each pair on `=`.', 'Or use `URLSearchParams`.'],
    explanation: 'Using URLSearchParams handles URI encoding and empty strings standard-compliantly.',
    solution: `function parseQueryString(queryString) {
  const clean = queryString.replace(/^\\?/, '');
  if (!clean) return {};
  const params = new URLSearchParams(clean);
  const result = {};
  params.forEach((value, key) => {
    result[key] = value;
  });
  return result;
}`,
    relatedLessonSlug: 'javascript-objects'
  },
  {
    id: 'ex-23-sleep-promise',
    slug: 'promisified-sleep-delay',
    title: 'Implement a Promisified Sleep Function',
    description: 'Create an async sleep delay utility using native Promises and setTimeout.',
    difficulty: 'Beginner',
    topic: 'Asynchronous JavaScript',
    category: 'JavaScript',
    problemStatement: 'Write `sleep(ms)` returning a Promise that resolves after ms milliseconds.',
    starterCode: `function sleep(ms) {
  // Return Promise
}`,
    language: 'javascript',
    exampleInput: 'await sleep(500)',
    exampleOutput: 'Resolves after 500ms',
    testCases: [
      { inputDescription: 'sleep(100)', expectedOutputDescription: 'Resolves after ~100ms' }
    ],
    hints: ['Return `new Promise(resolve => setTimeout(resolve, ms))`.'],
    explanation: 'Wrapping setTimeout in a Promise enables await syntax for pausing execution cleanly in async flows.',
    solution: `function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}`,
    relatedLessonSlug: 'javascript-promises'
  },
  {
    id: 'ex-24-retry-async',
    slug: 'retry-async-operation',
    title: 'Retry an Async Operation N Times',
    description: 'Execute an asynchronous function up to maxRetries times until it resolves, throwing the last error if all attempts fail.',
    difficulty: 'Intermediate',
    topic: 'Promises & Async/Await',
    category: 'JavaScript',
    problemStatement: 'Write `retryAsync(fn, maxRetries)` that attempts `fn()` and retries upon rejection.',
    starterCode: `async function retryAsync(fn, maxRetries = 3) {
  // Your retry loop
}`,
    language: 'javascript',
    exampleInput: 'retryAsync(fetchData, 3)',
    exampleOutput: 'Result of fetchData or throws after 3 failed tries',
    testCases: [
      { inputDescription: 'Fails twice then succeeds on 3rd try', expectedOutputDescription: 'Resolves with 3rd try data' }
    ],
    hints: ['Use a `for` loop with a `try/catch` block inside.', 'If error occurs on last iteration, rethrow it.'],
    explanation: 'A try/catch within a retry loop guarantees sequential attempts with clean termination upon first success.',
    solution: `async function retryAsync(fn, maxRetries = 3) {
  let lastError;
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      if (attempt === maxRetries) {
        throw lastError;
      }
    }
  }
}`,
    relatedLessonSlug: 'javascript-async-await'
  },
  {
    id: 'ex-25-ts-pick-property',
    slug: 'typescript-safe-pluck',
    title: 'TypeScript Safe Property Pluck',
    description: 'Implement a type-safe pluck function that extracts an array of values for a specified property key across an object collection.',
    difficulty: 'Intermediate',
    topic: 'Generics & keyof',
    category: 'TypeScript',
    problemStatement: 'Write `pluck<T, K extends keyof T>(items: T[], key: K): T[K][]` ensuring type preservation.',
    starterCode: `function pluck(items, key) {
  // Return plucked property array
}`,
    language: 'typescript',
    exampleInput: 'pluck([{ id: 1, name: "A" }, { id: 2, name: "B" }], "name")',
    exampleOutput: '["A", "B"] (typed as string[])',
    testCases: [
      { inputDescription: 'Plucking "id" returns number[]', expectedOutputDescription: '[1, 2]' }
    ],
    hints: ['Constrain key with `K extends keyof T`. Return type is `T[K][]`.'],
    explanation: 'Generic constraints guarantee compile-time safety so developers cannot request keys that do not exist on T.',
    solution: `function pluck<T, K extends keyof T>(items: T[], key: K): T[K][] {
  return items.map(item => item[key]);
}`,
    relatedLessonSlug: 'typescript-generics'
  },
  {
    id: 'ex-26-dom-count-elements',
    slug: 'count-dom-elements-by-tag',
    title: 'Count DOM Elements by Tag Name',
    description: 'Write a helper function to count how many elements of a specified tag name exist inside a parent container.',
    difficulty: 'Beginner',
    topic: 'DOM Manipulation',
    category: 'JavaScript',
    problemStatement: 'Write `countTags(container, tagName)` returning the integer count.',
    starterCode: `function countTags(container, tagName) {
  // Return count
}`,
    language: 'javascript',
    exampleInput: 'countTags(document.body, "p")',
    exampleOutput: '4',
    testCases: [
      { inputDescription: 'Container with three <div>s', expectedOutputDescription: '3' }
    ],
    hints: ['Use `container.querySelectorAll(tagName).length`.'],
    explanation: 'querySelectorAll provides an accurate NodeList count scoped to the provided parent container.',
    solution: `function countTags(container, tagName) {
  if (!container || !tagName) return 0;
  return container.querySelectorAll(tagName).length;
}`,
    relatedLessonSlug: 'javascript-dom'
  },
  {
    id: 'ex-27-format-bytes',
    slug: 'format-bytes-readable',
    title: 'Format Bytes into Human Readable Size',
    description: 'Convert numeric byte sizes (e.g. 1048576) into formatted strings ("1 MB", "500 KB", "1.5 GB").',
    difficulty: 'Intermediate',
    topic: 'Math & Strings',
    category: 'JavaScript',
    problemStatement: 'Write `formatBytes(bytes, decimals = 2)` that returns the formatted size.',
    starterCode: `function formatBytes(bytes, decimals = 2) {
  // Return formatted string
}`,
    language: 'javascript',
    exampleInput: 'formatBytes(1048576)',
    exampleOutput: '"1 MB"',
    testCases: [
      { inputDescription: '0', expectedOutputDescription: '"0 Bytes"' },
      { inputDescription: '1024', expectedOutputDescription: '"1 KB"' }
    ],
    hints: ['Units array: `["Bytes", "KB", "MB", "GB", "TB"]`. Calculate unit index using `Math.floor(Math.log(bytes) / Math.log(1024))`.'],
    explanation: 'Logarithmic scaling identifies the appropriate byte order of magnitude without long switch/case ladders.',
    solution: `function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}`,
    relatedLessonSlug: 'javascript-variables'
  },
  {
    id: 'ex-28-clamp-number',
    slug: 'math-clamp-number',
    title: 'Clamp a Value Between Min and Max',
    description: 'Constrain a number within an inclusive lower and upper bound.',
    difficulty: 'Beginner',
    topic: 'Math',
    category: 'JavaScript',
    problemStatement: 'Write `clamp(val, min, max)` where value is constrained inside the range [min, max].',
    starterCode: `function clamp(val, min, max) {
  // Return clamped number
}`,
    language: 'javascript',
    exampleInput: 'clamp(15, 0, 10)',
    exampleOutput: '10',
    testCases: [
      { inputDescription: '-5, 0, 10', expectedOutputDescription: '0' },
      { inputDescription: '5, 0, 10', expectedOutputDescription: '5' }
    ],
    hints: ['Use `Math.min(Math.max(val, min), max)`.'],
    explanation: 'Nesting Math.max and Math.min guarantees the number is never lower than min and never exceeds max.',
    solution: `function clamp(val, min, max) {
  return Math.min(Math.max(val, min), max);
}`,
    relatedLessonSlug: 'javascript-variables'
  },
  {
    id: 'ex-29-slugify-string',
    slug: 'slugify-string-url',
    title: 'Generate URL-Friendly Slug from String',
    description: 'Transform a title like "Hello World! What is Angular?" into a clean URL slug "hello-world-what-is-angular".',
    difficulty: 'Beginner',
    topic: 'Strings & RegEx',
    category: 'JavaScript',
    problemStatement: 'Write `slugify(text)` removing special characters and replacing spaces with single hyphens.',
    starterCode: `function slugify(text) {
  // Return slug
}`,
    language: 'javascript',
    exampleInput: 'slugify("Hello World! What is Angular?")',
    exampleOutput: '"hello-world-what-is-angular"',
    testCases: [
      { inputDescription: '"  Multiple   Spaces  "', expectedOutputDescription: '"multiple-spaces"' }
    ],
    hints: ['Lowercase, remove invalid chars with `/[^a-z0-9 -]/g`, replace spaces with `-`, trim dashes.'],
    explanation: 'Slug generation standardizes URLs for SEO and prevents invalid URI character errors.',
    solution: `function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\\s+/g, '-')
    .replace(/-+/g, '-');
}`,
    relatedLessonSlug: 'javascript-functions'
  },
  {
    id: 'ex-30-ng-signal-counter',
    slug: 'angular-signal-counter-state',
    title: 'Angular Signal State Incrementer & Computed Double',
    description: 'Use Angular Signals to build a reactive counter model that automatically computes its doubled value.',
    difficulty: 'Intermediate',
    topic: 'Angular Signals',
    category: 'Angular',
    problemStatement: 'Create a factory `createCounter(initial = 0)` returning `{ count, doubleCount, increment, reset }` using `signal()` and `computed()`.',
    starterCode: `import { signal, computed } from '@angular/core';

export function createCounter(initial = 0) {
  // Return signal-based counter object
}`,
    language: 'typescript',
    exampleInput: 'const c = createCounter(5); c.increment();',
    exampleOutput: 'count() === 6, doubleCount() === 12',
    testCases: [
      { inputDescription: 'Initial 2, increment()', expectedOutputDescription: 'count() is 3, doubleCount() is 6' }
    ],
    hints: ['Define `const count = signal(initial);` and `const doubleCount = computed(() => count() * 2);`.'],
    explanation: 'Angular Signals provide synchronous fine-grained reactivity where computed signals automatically update without subscription leaks.',
    solution: `import { signal, computed } from '@angular/core';

export function createCounter(initial = 0) {
  const count = signal(initial);
  const doubleCount = computed(() => count() * 2);

  const increment = (step = 1) => count.update(v => v + step);
  const decrement = (step = 1) => count.update(v => v - step);
  const reset = () => count.set(initial);

  return {
    count: count.asReadonly(),
    doubleCount,
    increment,
    decrement,
    reset
  };
}`,
    relatedLessonSlug: 'angular-signals'
  }
];

