from dataclasses import dataclass
from typing import Literal

Status = Literal["DIRECT", "ASSIST", "LIMITED", "NO_MATCH", "UNKNOWN"]
Goal = Literal["electrical", "thermal"]
Interface = Literal[
    "copper",
    "conductive-metal",
    "semiconductor",
    "insulator",
    "mixed",
    "unknown",
]
Contact = Literal["clean", "oxidized", "uncertain"]
Environment = Literal["dry", "corrosive", "high-temperature", "vacuum", "unknown"]


@dataclass(frozen=True)
class CopperRequest:
    goal: Goal
    path_continuous: bool
    interface_type: Interface
    contact_quality: Contact = "clean"
    environment: Environment = "dry"
    mechanically_secured: bool = True
    within_known_load_limit: bool = True


@dataclass(frozen=True)
class CopperResult:
    status: Status
    reason: str
    helper: str | None = None


def connect(req: CopperRequest) -> CopperResult:
    """Smallest rediscoverable model of Copper.Connect.

    This is an engineering decision model, not a material simulation.
    It deliberately contains no Paramecia metaphor and no side effects.
    """
    if req.goal not in {"electrical", "thermal"}:
        return CopperResult("NO_MATCH", "Copper.Connect models electrical or thermal transfer only.")

    if not req.path_continuous:
        return CopperResult("NO_MATCH", "No continuous conductive path exists.")

    if req.interface_type == "unknown" or req.environment == "unknown" or req.contact_quality == "uncertain":
        return CopperResult("UNKNOWN", "Interface, environment, or contact evidence is incomplete.")

    if req.interface_type == "insulator":
        return CopperResult("NO_MATCH", "An insulating interface does not provide direct conductive continuity.")

    if req.interface_type == "semiconductor":
        return CopperResult(
            "ASSIST",
            "Semiconductor interfaces normally require an engineered contact/barrier stack rather than assuming raw copper contact is suitable.",
            "engineered contact / diffusion barrier",
        )

    if req.contact_quality == "oxidized":
        return CopperResult(
            "ASSIST",
            "Surface oxide can raise contact resistance and reduce connection reliability.",
            "surface preparation, pressure, plating, or suitable joining process",
        )

    if not req.mechanically_secured:
        return CopperResult(
            "ASSIST",
            "Conductivity alone does not create a mechanically reliable joint.",
            "clamp, crimp, solder/braze, connector, or other mechanical joint",
        )

    if req.environment in {"corrosive", "high-temperature"} or not req.within_known_load_limit:
        return CopperResult(
            "LIMITED",
            "The pathway can conduct, but environment or load requires explicit engineering limits or protection.",
            "protection, geometry change, alloy/plating, cooling, or alternate material",
        )

    return CopperResult(
        "DIRECT",
        "A continuous copper path with a conductive interface, adequate contact, and acceptable conditions can carry electrical current or heat.",
    )


def rediscover() -> tuple[str, ...]:
    """Return the invariant reset sequence when scale or interpretation becomes muddied."""
    return (
        "identity: Cu / atomic number 29 / group 11",
        "function: carry electrical current or heat",
        "input: source + target + path + conditions",
        "requirement: continuous conductive path",
        "limit: finite load, surface, environment, and geometry constraints",
        "compatibility: conductive interfaces are easiest",
        "assistance: joining/barrier/plating/insulation/mechanical support when needed",
    )
