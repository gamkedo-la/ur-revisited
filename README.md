# Prototype Square Tactics

Goal: simple tactics game prototype

Progress: so far we have something like checkers with no movement restrictions, bad starting locations, and infinite respawn of pieces.


Next steps:
- user selects piece -> user clicks 'move' or 'attack' -> display valid targets -> user clicks target
    - EDIT: well, polytopia abstracts this decision away and figures out from the tile you clicked whether you meant to move or attack... might be a good idea; tho this approch is less useful if a unit has multiple different attacks it can use against a target (ie: fireball vs freeze)... I'm not sure which is better.
    - let's go with the assume-from-click-location for now, just because it's simpler/faster to implement.
- different units with different abilities (like, _wildly_ different: orthogonally different abilities. Not just different stat numbers)
- maybe eventually make an iso-grid version
