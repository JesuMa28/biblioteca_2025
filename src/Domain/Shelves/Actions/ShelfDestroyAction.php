<?php

namespace Domain\Shelves\Actions;

use Domain\Shelves\Models\Shelf;

class ShelfDestroyAction
{
    public function __invoke(Shelf $shelf): void
    {
        $shelf->delete();
    }
}
