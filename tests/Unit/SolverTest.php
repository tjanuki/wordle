<?php

use App\WordleSolver;

beforeEach(function () {
    $this->solver = new WordleSolver();
});

it('returns the most diverse words first.', function () {

    $answers = [];

    $word = $this->solver->solve($answers);
    $variations = array_unique(str_split($word));

    expect(count($variations))->toEqual(5);
});

it('eliminate invalid letters and return another variety of words.', function () {

    $answers = [
        'audio-iiiii',
        'apple-iiiii'
    ];

    $word = $this->solver->solve($answers);
    $letters = str_split($word);
    $variations = array_unique($letters);

    expect(count($variations))->toEqual(5);
    expect($letters)->not->toContain(['a', 'u', 'd', 'i', 'o', 'a', 'p', 'p', 'l', 'e']);
});

it('prioritizes the correct letters and return the next possibility.', function () {

    $answers = [
        'audio-ieeei'
    ];

    $word = $this->solver->solve($answers);
    $letters = str_split($word);

    expect($letters[1])->toEqual('u');
    expect($letters[2])->toEqual('d');
    expect($letters[3])->toEqual('i');
});

it('prioritizes the uses letters and return the next possibility.', function () {

    $answers = [
        'audio-iuuui'
    ];

    $word = $this->solver->solve($answers);
    $letters = str_split($word);

    expect($letters)->toContain('u');
    expect($letters)->toContain('d');
    expect($letters)->toContain('i');
});

it('finds word by multiple answers.', function () {

    $answers = [
        'audio-iiiiu',
        'ferny-iuiii',
        'pombe-ieiiu',
        'soget-ueiei',
        'hosel-ieeee',
    ];

    $word = $this->solver->solve($answers);

    expect($word)->toEqual('losel');
});

it('returns the error if there is no possibilities.', function () {

    $answers = [
        'abcde-iiiii',
        'fgehi-iiiii',
        'jklmn-iiiii',
        'opqrs-iiiii',
        'tuvwx-iiiii',
    ];

    $word = $this->solver->solve($answers);

    expect($word)->toEqual('error');
});

