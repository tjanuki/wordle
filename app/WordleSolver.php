<?php

namespace App;

use App\Models\Word;

class WordleSolver
{

    /**
     * Find the most likely word from the answers.
     * @param array $answers
     * @return string
     */
    public function solve(array $answers = []): string
    {
        if (empty($answers)) {
            return Word::where('variety', 5)
                ->inRandomOrder()
                ->first()
                ->word;
        }

        $exacts = [];
        $used = [];
        $invalids = [];
        foreach ($answers as $answer) {
            list($word, $results) = explode('-', $answer);
            $words = str_split($word);
            $status = str_split($results);
            for ($i = 0; $i<5; $i++) {
                match ($status[$i]) {
                    'i' => $invalids[] = $words[$i],
                    'e' => $exacts[$i] = $words[$i],
                    'u' => $used[$i] = $words[$i],
                };
            }
        }

        $wordQuery = Word::query();
        foreach ($exacts as $index => $letter) {
            $wordQuery->where('letter' . ($index + 1), $letter);
        }

        foreach ($used as $index => $letter) {
            $wordQuery->where('letter' . ($index + 1), '<>', $letter);
            $wordQuery->where('word', 'like', "%{$letter}%");
        }

        foreach (array_unique($invalids) as $letter) {
            $wordQuery->where('word', 'not like', "%{$letter}%");
        }

        $nextWord = $wordQuery
            ->orderByDesc('variety')
            ->first();

        return $nextWord->word ?? 'error';
    }
}