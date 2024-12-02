# AngelScript

- [](testmap.md)
- 
<resource src="cartesian-segment-lerp-angelscript.w3x" />

<video src="../resources/map/cartesian-segment-lerp/angelscript/cartesian-segment-lerp-angelscript.mp4"/>

```c++
float missileTick = .01f;
table missileTable = {};

float lerp(float a, float b, float t) {
    return a*(1-t)+b*t;
}

void missileCallback() {
    timer t = GetExpiredTimer();
    uint index = GetHandleId(t);
    auto @m = cast<Missile>(missileTable[index]);
    if (!m.tick()) return;
    missileTable.delete(index);
}


class Missile {

    Missile(SpellEffectEvent@ spellEffectEvent) {
        auto @evt = @this.spellEffectEvent = @spellEffectEvent;
        auto    @s = @evt.casterPoint;
        s.z += 100;
        auto    @e = @evt.targetPoint;
        e.z += 50;


        specialEffect = AddSpecialEffect("Missile\\ShockBlast_Green.mdx", s.x, s.y);
        SetSpecialEffectZ(specialEffect, s.z);

        auto dp = evt.targetPoint - evt.casterPoint;
        distance = SquareRoot(dp.x * dp.x + dp.y * dp.y);
        time = distance / speed;

        timer t = CreateTimer();

        missileTable.set(GetHandleId(t), @this);
        TimerStart(t, missileTick, true, @missileCallback);
    }

    bool tick() {
        bool complete = false;
        float t = elapsed / time;
        if (t >= 1.f) {
            t = 1.f;
            complete = true;
        }

        auto @evt = @spellEffectEvent;
        auto @s = evt.casterPoint;
        auto @e = evt.targetPoint;

        SetSpecialEffectPositionWithZ(specialEffect,
            lerp(s.x, e.x, t),
            lerp(s.y, e.y, t),
            lerp(s.z, e.z, t)
            );

        if (complete) {
            DestroyEffect(specialEffect);
        }

        elapsed+=missileTick;
            return complete;
    }

    float elapsed = 0.f;
    float speed = 500.f;
    float time;
    float distance;
    effect specialEffect;
    SpellEffectEvent@ spellEffectEvent;
}

class Point {
    Point() {
        x = 0.f;
        y = 0.f;
        z = 0.f;
    }

    Point(float x, float y, float z = 0.f) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    Point(unit u) {
        x = GetUnitX(u);
        y = GetUnitY(u);
        z = GetUnitZ(u);
    }

    Point opSub(Point b) {
        return Point(x - b.x, y - b.y, z - b.z);
    }

    float x;
    float y;
    float z;
}

class SpellEffectEvent {
    SpellEffectEvent() {
        caster = GetTriggerUnit();
        casterPoint = Point(caster);

        float tx = GetSpellTargetX();
        float ty = GetSpellTargetY();
        targetPoint = Point(tx, ty, GetAxisZ(tx, ty));
    }

    unit caster;
    Point casterPoint;
    Point targetPoint;
}

void main() {
    TimerStart(CreateTimer(), 0.f, false, function() {
        DestroyTimer(GetExpiredTimer());
        trigger t = CreateTrigger();

        for (int i = 0; i < 12 ; ++i) {
            player p = Player(i);
            TriggerRegisterPlayerUnitEvent(t, p, EVENT_PLAYER_UNIT_SPELL_EFFECT, nil);
            if (GetPlayerController(p) == MAP_CONTROL_USER && GetPlayerSlotState(p) == PLAYER_SLOT_STATE_PLAYING) {
                unit u = CreateUnit(p, 'Hjai', 0, 0, 0);
                SelectUnit(u, true);
                UnitAddAbility(u, 'A001');
                AddSpecialEffectTarget("Attachment\\Wings_Nature.mdx", u, "chest");
                AddSpecialEffectTarget("Attachment\\Torch.mdx", u, "hand left");
            }
        }

        TriggerAddAction(t, function() {
            SpellEffectEvent e;
                switch(GetSpellAbilityId()){
                    case 'A001':
                        Missile(@e);
                            break;
                }
        });


    });
}

void config() {
}

```