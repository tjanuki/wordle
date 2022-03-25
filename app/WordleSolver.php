<?php

namespace App;

use App\Models\Word;

class WordleSolver
{
    private array $exacts = [];
    private array $used = [];
    private array $invalids = [];

    /**
     * Find the most likely word from the answers.
     * @param array $answers
     * @param bool $prioritizeInvalid
     * @return string
     */
    public function solve(array $answers, bool $prioritizeInvalid = false): string
    {

        if (empty($answers)) {
            return Word::where('variety', 5)
                ->inRandomOrder()
                ->first()
                ->word;
        }

        foreach ($answers as $answer) {
            list($word, $results) = explode('-', $answer);
            $words = str_split($word);
            $status = str_split($results);
            for ($i = 0; $i<5; $i++) {
                match ($status[$i]) {
                    'i' => $this->invalids[] = $words[$i],
                    'e' => $this->exacts[$i] = $words[$i],
                    'u' => $this->used[$i] = $words[$i],
                };
            }
        }

        if ($prioritizeInvalid && $word = $this->getAnotherVariation()) {
            return $word;
        }

        $wordQuery = Word::query();
        foreach ($this->exacts as $index => $letter) {
            $wordQuery->where('letter' . ($index + 1), $letter);
        }

        foreach ($this->used as $index => $letter) {
            $wordQuery->where('letter' . ($index + 1), '<>', $letter);
            $wordQuery->where('word', 'like', "%{$letter}%");
        }

        foreach (array_unique($this->invalids) as $letter) {
            $wordQuery->where('word', 'not like', "%{$letter}%");
        }

        $nextWord = $wordQuery
            ->orderByDesc('variety')
            ->first();

        return $nextWord->word ?? 'error';
    }

    /**
     * Find unused letters for a higher probability of being correct.
     * @return string|null
     */
    private function getAnotherVariation(): ?string
    {
        $wordQuery = Word::query();
        foreach (array_unique(array_merge($this->invalids, $this->exacts, $this->used)) as $letter) {
            $wordQuery->where('word', 'not like', "%{$letter}%");
        }

        return $wordQuery
                ->orderByDesc('variety')
                ->first()
                ->word ?? null;
    }
}