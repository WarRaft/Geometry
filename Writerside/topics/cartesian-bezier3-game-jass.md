# JASS

- [](testmap.md)
- [](dummy.md)
- [](channel.md)

<resource src="../resources/map/cartesian-bezier3-game/jass/map.w3x" />

<video src="../resources/map/cartesian-bezier3-game/jass/video.mp4"/>

```sql
function SetBezier3XY takes integer id, integer index, unit missile, real ax, real ay, real cx, real cy, real t returns nothing
    local real k0 = (1 - t) * (1 - t)
    local real k2 = t * t
    local real k1 = t - k2
    local real bx = LoadReal(udg_HT, id, index * 2)
    local real by = LoadReal(udg_HT, id, index * 2 + 1)
    local real x = k0 * ax + 2 * k1 * bx + k2 * cx
    local real y = k0 * ay + 2 * k1 * by + k2 * cy
    call SetUnitX(missile, x)
    call SetUnitY(missile, y)
endfunction

function onTick takes nothing returns nothing
    local timer t = GetExpiredTimer()
    local integer tid = GetHandleId(t)
    local real time = LoadReal(udg_HT, tid, 'time')
    local unit cstr = LoadUnitHandle(udg_HT, tid, 'cstr')
    local real cx = LoadReal(udg_HT, tid, 'cx__')
    local real cy = LoadReal(udg_HT, tid, 'cy__')
    local real ox = LoadReal(udg_HT, tid, 'ox__')
    local real oy = LoadReal(udg_HT, tid, 'oy__')
    local real elapsed = LoadReal(udg_HT, tid, 'elps')
    local integer i = -1
    local real k = elapsed / time
    local real k1
    local boolean complete = false

    if k > 1 then
        set complete = true
        set k = 1
    endif

    loop
        set i = i + 1
        exitwhen  i == 4
        if i < 2 then
            set k1 = Pow(k, 2)
        else
            set k1 = Pow(k, 3)
        endif
        call SetBezier3XY(tid, i, LoadUnitHandle(udg_HT, tid, i * 2), cx, cy, ox, oy, k1)
    endloop


    call SaveReal(udg_HT, tid, 'elps', elapsed + .01)
    if complete then
        call PauseTimer(t)
        call DestroyTimer(t)
        set i = -1
        loop
            set i = i + 1
            exitwhen  i == 4
            call KillUnit(LoadUnitHandle(udg_HT, tid, i * 2))
            call DestroyEffect(LoadEffectHandle(udg_HT, tid, i * 2 + 1))
        endloop
        call FlushChildHashtable(udg_HT, tid)
    endif

    set t = null
    set cstr = null
endfunction

function CreateMissileDummy takes player owner, integer id, integer index, real x, real y, string attach returns nothing
    local unit u = CreateUnit(owner, 'u000', x, y, 0)
    set index = index * 2
    call SaveUnitHandle(udg_HT, id, index, u)
    call SaveEffectHandle(udg_HT, id, index + 1, AddSpecialEffectTarget(attach, u, "head"))
    set u = null
endfunction

function SaveAnchorPoint takes integer id, integer index, real ax, real ay, real bx, real by, boolean right returns nothing
    local real x
    local real y
    if right then
        set x = ax + by - ay
        set y = ay - bx + ax
    else
        set x = ax - by + ay
        set y = ay + bx - ax
    endif
    set index = index * 2

    call SaveReal(udg_HT, id, index, x)
    call SaveReal(udg_HT, id, index+1, y)
endfunction

function onSpellEffect takes nothing returns nothing
    local unit caster = GetTriggerUnit()
    local player owner = GetOwningPlayer(caster)
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
        set speed = 200

        set t = CreateTimer()
        set tid = GetHandleId(t)

        call SaveUnitHandle(udg_HT, tid, 'cstr', caster)

        call CreateMissileDummy(owner, tid, 0, cx, cy, "Missile\\IncendiaryBullet_Red.mdx")
        call CreateMissileDummy(owner, tid, 1, cx, cy, "Missile\\IncendiaryBullet_Blue.mdx")
        call CreateMissileDummy(owner, tid, 2, cx, cy, "Missile\\IncendiaryBullet_Green.mdx")
        call CreateMissileDummy(owner, tid, 3, cx, cy, "Missile\\IncendiaryBullet_Purple.mdx")

        call SaveAnchorPoint(tid, 0, cx, cy, ox, oy, true)
        call SaveAnchorPoint(tid, 1, cx, cy, ox, oy, false)
        call SaveAnchorPoint(tid, 2, ox, oy, cx, cy, true)
        call SaveAnchorPoint(tid, 3, ox, oy, cx, cy, false)

        call SaveReal(udg_HT, tid, 'time', distance / speed)
        call SaveReal(udg_HT, tid, 'cx__', cx)
        call SaveReal(udg_HT, tid, 'cy__', cy)
        call SaveReal(udg_HT, tid, 'ox__', ox)
        call SaveReal(udg_HT, tid, 'oy__', oy)

        call TimerStart(t, .01, true, function onTick)
    endif

    set caster = null
    set owner = null
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
            call AddSpecialEffectTarget("Attachment\\Wings_Chaos.mdx", u, "chest")
            call AddSpecialEffectTarget("Attachment\\Shalamayne_Fireforged.mdx", u, "hand left")
            call AddSpecialEffectTarget("Attachment\\MageHat.mdx", u, "head")
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