import { Challenge } from '../models/content.models';

export const CODING_CHALLENGES: Challenge[] = [
  {
    id: 'ch-two-sum',
    slug: 'two-sum-lookup',
    title: 'Two Sum Target Lookup in O(n) Time',
    difficulty: 'Beginner',
    category: 'JavaScript',
    estimatedMinutes: 20,
    concepts: ['Hash Map', 'Time Complexity', 'Array Iteration'],
    problem: 'Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`. You may assume each input has exactly one solution, and you may not use the same element twice.',
    requirements: [
      'The algorithm must run in O(n) linear time complexity.',
      'Return an array containing exactly two numbers: `[index1, index2]`.',
      'Do not use nested loops (which results in O(n^2) quadratic time).'
    ],
    starterCode: `function twoSum(nums, target) {
  // Your code here
  return [];
}`,
    language: 'javascript',
    hints: [
      'Can you remember numbers you have already visited?',
      'For any number `x`, what number are you looking for to equal target? That is `target - x`.',
      'Use a Map or JS object to store `{ [number]: index }` as you iterate once.'
    ],
    solution: `function twoSum(nums, target) {
  const seen = new Map();

  for (let i = 0; i < nums.length; i++) {
    const current = nums[i];
    const complement = target - current;

    if (seen.has(complement)) {
      return [seen.get(complement), i];
    }

    seen.set(current, i);
  }

  return [];
}`,
    explanation: 'By storing each number and its index in a Map, we can look up whether the required complement exists in O(1) average time, making the whole algorithm run in a single pass of O(n) time and O(n) auxiliary space.'
  },
  {
    id: 'ch-valid-parentheses',
    slug: 'valid-bracket-sequence',
    title: 'Validate Balanced Parentheses and Brackets',
    difficulty: 'Beginner',
    category: 'JavaScript',
    estimatedMinutes: 25,
    concepts: ['Stack Data Structure', 'String Parsing', 'LIFO Principle'],
    problem: 'Given a string `s` containing just the characters `(`, `)`, `{`, `}`, `[` and `]`, determine if the input string is valid. An input string is valid if open brackets are closed by the same type of brackets in the correct order, and every close bracket has a corresponding open bracket.',
    requirements: [
      'Return a boolean `true` if valid, `false` otherwise.',
      'Must handle empty string as valid (`true`).',
      'Must handle nested structures like `"{[()]}"` correctly.'
    ],
    starterCode: `function isValidBrackets(s) {
  // Your code here
  return false;
}`,
    language: 'javascript',
    hints: [
      'Consider the Last-In-First-Out (LIFO) property of a Stack.',
      'When you see an opening bracket, push its expected closing bracket onto a stack.',
      'When you see a closing bracket, pop from the stack and verify that it matches.'
    ],
    solution: `function isValidBrackets(s) {
  if (s.length % 2 !== 0) return false;

  const stack = [];
  const map = {
    '(': ')',
    '[': ']',
    '{': '}'
  };

  for (const char of s) {
    if (map[char]) {
      // It is an opening bracket; push expected closing bracket
      stack.push(map[char]);
    } else {
      // It is a closing bracket; top of stack must match
      if (stack.pop() !== char) {
        return false;
      }
    }
  }

  return stack.length === 0;
}`,
    explanation: 'A stack is the canonical data structure for nested matching. Pushing the expected close bracket simplifies comparison on closing characters: we pop the top element and verify it matches the current character.'
  },
  {
    id: 'ch-debounce',
    slug: 'custom-debounce-implementation',
    title: 'Implement Custom Debounce with Immediate & Cancel Options',
    difficulty: 'Intermediate',
    category: 'JavaScript',
    estimatedMinutes: 30,
    concepts: ['Higher Order Functions', 'Closures', 'Timers (setTimeout)', 'Type Safety'],
    problem: 'Implement a `debounce` function that delays invoking `func` until after `wait` milliseconds have elapsed since the last time the debounced function was invoked. It should also expose a `.cancel()` method to clear pending executions.',
    requirements: [
      'Preserve the original `this` context and arguments passed to the returned function.',
      'If invoked repeatedly before wait elapses, previous timers must be cancelled.',
      'Attach a `.cancel()` method to the returned function that stops pending invocations.'
    ],
    starterCode: `function debounce(fn, waitMs) {
  // Your code here
}`,
    language: 'javascript',
    hints: [
      'Use a closure variable `timeoutId` inside the outer function.',
      'Clear the existing timer using `clearTimeout(timeoutId)` on every invocation.',
      'Assign the cancel method directly as a property of the returned wrapper function.'
    ],
    solution: `function debounce(fn, waitMs) {
  let timeoutId = null;

  function debounced(...args) {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      fn.apply(this, args);
      timeoutId = null;
    }, waitMs);
  }

  debounced.cancel = function() {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  };

  return debounced;
}`,
    explanation: 'The closure keeps a persistent reference to `timeoutId`. Every time `debounced()` is called, any in-flight timer is aborted via `clearTimeout`, resetting the waiting period. The attached `.cancel()` method allows components to clean up pending timers upon unmount.'
  },
  {
    id: 'ch-event-emitter',
    slug: 'custom-event-emitter',
    title: 'Build a Type-Safe Pub/Sub Event Emitter',
    difficulty: 'Intermediate',
    category: 'TypeScript',
    estimatedMinutes: 40,
    concepts: ['Observer Pattern', 'Pub/Sub', 'Object Oriented Programming', 'Memory Management'],
    problem: 'Create an `EventEmitter` class with `on(eventName, listener)`, `off(eventName, listener)`, `emit(eventName, ...args)`, and `once(eventName, listener)` methods.',
    requirements: [
      'The `.on` method must return an unsubscribe function `() => void` for ergonomic cleanup.',
      'The `.once` method must execute the callback exactly once and automatically detach itself.',
      'Calling `.emit` for an event without subscribers must not throw an error.'
    ],
    starterCode: `export class EventEmitter {
  // Your implementation here
}`,
    language: 'typescript',
    hints: [
      'Store events in a `Map<string, Set<Function>>` to prevent duplicate handler registrations.',
      'For `once`, wrap the original listener in a wrapper that invokes the original and unregisters the wrapper.'
    ],
    solution: `type Listener = (...args: any[]) => void;

export class EventEmitter {
  private events = new Map<string, Set<Listener>>();

  on(event: string, listener: Listener): () => void {
    if (!this.events.has(event)) {
      this.events.set(event, new Set());
    }
    this.events.get(event)!.add(listener);

    // Return cleanup unsubscribe function
    return () => this.off(event, listener);
  }

  off(event: string, listener: Listener): void {
    const listeners = this.events.get(event);
    if (listeners) {
      listeners.delete(listener);
      if (listeners.size === 0) {
        this.events.delete(event);
      }
    }
  }

  emit(event: string, ...args: any[]): void {
    const listeners = this.events.get(event);
    if (!listeners) return;

    // Iterate over a snapshot array to avoid mutation during emission
    [...listeners].forEach(listener => {
      try {
        listener(...args);
      } catch (err) {
        console.error(\`Error in event listener for "\${event}":\`, err);
      }
    });
  }

  once(event: string, listener: Listener): () => void {
    const wrapper: Listener = (...args: any[]) => {
      this.off(event, wrapper);
      listener(...args);
    };
    return this.on(event, wrapper);
  }
}`,
    explanation: 'Using `Set<Listener>` prevents accidental double-registration of the exact same callback. Cloning listeners via `[...listeners]` during `.emit` avoids bugs where a listener unsubscribes itself during execution.'
  },
  {
    id: 'ch-deep-clone',
    slug: 'deep-clone-with-circular-references',
    title: 'Custom Deep Clone with Circular References Handling',
    difficulty: 'Advanced',
    category: 'JavaScript',
    estimatedMinutes: 45,
    concepts: ['Recursion', 'WeakMap', 'Object Traversal', 'Reference Equality'],
    problem: 'Implement a deep cloning function `deepClone(value)` that creates an independent copy of arbitrary JavaScript objects, arrays, Dates, RegExps, and handles circular references without infinite recursion.',
    requirements: [
      'Primitives (number, string, boolean, null, undefined) must return unmodified.',
      'Date and RegExp instances must be cloned into new Date and RegExp objects.',
      'Circular object structures must be resolved using a WeakMap cache to prevent stack overflow.',
      'Arrays and nested plain objects must be recursively cloned.'
    ],
    starterCode: `function deepClone(value, hash = new WeakMap()) {
  // Your code here
}`,
    language: 'javascript',
    hints: [
      'If `typeof value !== "object" || value === null`, return value directly.',
      'Before cloning an object, check `hash.get(value)`. If it exists, return the cached clone.',
      'Immediately store `hash.set(value, clone)` BEFORE recursing over child properties.'
    ],
    solution: `function deepClone(value, hash = new WeakMap()) {
  // 1. Primitives & functions
  if (value === null || typeof value !== 'object') {
    return value;
  }

  // 2. Handle Date
  if (value instanceof Date) {
    return new Date(value.getTime());
  }

  // 3. Handle RegExp
  if (value instanceof RegExp) {
    return new RegExp(value.source, value.flags);
  }

  // 4. Handle Circular References
  if (hash.has(value)) {
    return hash.get(value);
  }

  // 5. Initialize cloned array or object
  const clone = Array.isArray(value) ? [] : Object.create(Object.getPrototypeOf(value));
  hash.set(value, clone);

  // 6. Recursively clone keys
  const keys = Reflect.ownKeys(value);
  for (const key of keys) {
    clone[key] = deepClone(value[key], hash);
  }

  return clone;
}`,
    explanation: 'A `WeakMap` tracks memory references during recursion. By storing the cloned shell in the hash map before descending into properties, circular references point back to the clone shell rather than triggering an infinite call stack.'
  }
];

