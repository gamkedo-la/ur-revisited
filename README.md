# Prototype Square Tactics

Goal: simple tactics game prototype

Progress: so far we have something like checkers with no movement restrictions, bad starting locations, and infinite respawn of pieces.


Next steps:
- user selects piece -> user clicks 'move' or 'attack' -> display valid targets -> user clicks target
    - EDIT: well, polytopia abstracts this decision away and figures out from the tile you clicked whether you meant to move or attack... might be a good idea; tho this approch is less useful if a unit has multiple different attacks it can use against a target (ie: fireball vs freeze)... I'm not sure which is better.
    - let's go with the assume-from-click-location for now, just because it's simpler/faster to implement.
- different units with different abilities (like, _wildly_ different: orthogonally different abilities. Not just different stat numbers)
- maybe eventually make an iso-grid version

# Nov 10th, 2024 at 10:38pm
 
Ok, added new `getAvailablePieceMoves()` function that _should_ give a range of available movement spaces for the selected piece (1 space w/o diagonals or board-edge checks for right now). Next: need to make sure it works for drawing highlights on tiles and doesn't crash the game. Then, make sure player can move to all the highlighted spaces.

Also, we're _really_ going to need to move unit/piece stuff to a class pretty soon, especially if we plan on having differentiable unit types... Ugh, I don't wanna deal with shared code stuff.. :sigh:... _Maybe_ I can just import individual movement functions (eg: 'cavalryMovement', 'infantryMovement', etc) like I do with pretty date/time stuff in Mineva, but I feel like that requires using modules and I don't know what all the implications are of that.

Wait... I can just have all the functions defined in a "unit utils" or "unit funcs" file and have each unit class reference them as necessary.

Either way, for a prototype like this, copy/paste should work fine for now. Remember it's a _rapid_ prototype. Less focus on polish and more focus on making the game work.
