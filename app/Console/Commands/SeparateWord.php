<?php

namespace App\Console\Commands;

use App\Models\Word;
use Illuminate\Console\Command;

class SeparateWord extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'word:separate';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Separate words by letter and count their types.';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        Word::whereNull('variety')
            ->get()
            ->map(function ($word) {
                $letters = str_split($word->word);
                $variations = [];
                foreach ($letters as $index => $letter) {
                    $word->{'letter' . $index + 1} = $letter;
                    if (! in_array($letter, $variations)){
                        $variations[] = $letter;
                    }
                }
                $word->variety = count($variations);
                $word->save();
            });

        $this->info('Completed.');
        return 0;
    }
}
