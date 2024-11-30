# JASS

- [](testmap.md)
- [](dummy.md)
- [](channel.md)

<resource src="cartesian-segment-lerp-jass.w3x"></resource>

<video src="./../resources/cartesian-segment-lerp-jass.mp4"/>

```sql
function MathRealLerp_ujapi takes real a, real b, real t returns real
    return a * (1-t) + b * t
endfunction

function onTick takes nothing returns nothing
    local timer t = GetExpiredTimer()
    local integer tid = GetHandleId(t)
    local real time = LoadReal(udg_HT, tid, 'time')
    local unit cstr = LoadUnitHandle(udg_HT, tid, 'cstr')
    local unit dumy = LoadUnitHandle(udg_HT, tid, 'misl')
    local real cx = LoadReal(udg_HT, tid, 'cx__')
    local real cy = LoadReal(udg_HT, tid, 'cy__')
    local real ox = LoadReal(udg_HT, tid, 'ox__')
    local real oy = LoadReal(udg_HT, tid, 'oy__')
    local real elapsed = LoadReal(udg_HT, tid, 'elps')
    local effect attach = LoadEffectHandle(udg_HT, tid, 'atch')
    local real k = elapsed / time
    local boolean complete = false

    if k > 1 then
        set complete = true
        set k = 1
    endif

    call SetUnitX(dumy, MathRealLerp_ujapi(cx, ox, k))
    call SetUnitY(dumy, MathRealLerp_ujapi(cy, oy, k))

    call SaveReal(udg_HT, tid, 'elps', elapsed + .01)

    if complete then
        call PauseTimer(t)
        call DestroyTimer(t)
        call DestroyEffect(attach)
        call KillUnit(dumy)
        call FlushChildHashtable(udg_HT, tid)
    endif

    set t = null
    set cstr = null
    set dumy = null
    set attach = null
endfunction

function onSpellEffect takes nothing returns nothing
    local unit caster = GetTriggerUnit()
    local unit missile
    local timer t
    local integer tid
    local real cx = GetUnitX(caster)
    local real cy = GetUnitY(caster)
    local real ox = GetSpellTargetX()
    local real oy = GetSpellTargetY()
    local real dx = ox - cx
    local real dy = oy - cy
    local real distance = SquareRoot(dx * dx + dy * dy)
    local real speed

    if GetSpellAbilityId() == 'A001' then
        set speed = 500

        set t = CreateTimer()
        set tid = GetHandleId(t)

        call SaveUnitHandle(udg_HT, tid, 'cstr', caster)

        set missile = CreateUnit(GetOwningPlayer(caster), 'u000', cx, cy, 0)
        call SaveUnitHandle(udg_HT, tid, 'misl', missile)

        call SaveEffectHandle(udg_HT, tid, 'atch', AddSpecialEffectTarget("Missile\\ShockBlast_Yellow.mdx", missile, "head"))

        call SaveReal(udg_HT, tid, 'time', distance / speed)
        call SaveReal(udg_HT, tid, 'cx__', cx)
        call SaveReal(udg_HT, tid, 'cy__', cy)
        call SaveReal(udg_HT, tid, 'ox__', ox)
        call SaveReal(udg_HT, tid, 'oy__', oy)

        call TimerStart(t, .01, true, function onTick)
    endif

    set caster = null
    set missile = null
endfunction

function onGameStart takes nothing returns nothing
    local integer i = -1
    local unit u
    local player p
    local trigger t = CreateTrigger()
    call DestroyTimer(GetExpiredTimer())

    loop
        set i = i + 1
        exitwhen i == bj_MAX_PLAYERS
        set p = Player(i)

        call TriggerRegisterPlayerUnitEvent(t, p, EVENT_PLAYER_UNIT_SPELL_EFFECT, null)

        if GetPlayerController(p) == MAP_CONTROL_USER and GetPlayerSlotState(p) == PLAYER_SLOT_STATE_PLAYING then
            set u = CreateUnit(p, 'nvil', 0, 0, 0)
            call SelectUnit(u, true)
            call UnitAddAbility(u, 'A001')
            call AddSpecialEffectTarget("Attachment\\DivineWings.mdx", u, "chest")
            call AddSpecialEffectTarget("Attachment\\Torch.mdx", u, "hand left")
        endif
    endloop

    call TriggerAddAction(t, function onSpellEffect)

    set u = null
    set p = null
    set t = null
endfunction

function InitTrig_main takes nothing returns nothing
    set udg_HT = InitHashtable()
    call TimerStart(CreateTimer(), 0, false, function onGameStart)
endfunction
```