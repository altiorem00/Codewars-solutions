class Dictionary {
  constructor(knownWords) {
    this.knownWords = knownWords;
  }

  findMostSimilar(term) {
    let mostSimilarWord = '';
    let minChanges = Infinity;

    for (const word of this.knownWords) {
      const changes = calculateChanges(term, word);

      if (changes < minChanges) {
        minChanges = changes;
        mostSimilarWord = word;
      }
    }

    return mostSimilarWord;
  }
}

function calculateChanges(word1, word2) {
  const m = word1.length;
  const n = word2.length;
  const dp = [];

  for (let i = 0; i <= m; i++) {
    dp[i] = [];
    dp[i][0] = i;
  }
  for (let j = 1; j <= n; j++) {
    dp[0][j] = j;
  }

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (word1[i - 1] === word2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.min(
          dp[i - 1][j - 1] + 1, // Replace
          dp[i][j - 1] + 1, // Insert
          dp[i - 1][j] + 1 // Delete
        );
      }
    }
  }

  return dp[m][n];
}
