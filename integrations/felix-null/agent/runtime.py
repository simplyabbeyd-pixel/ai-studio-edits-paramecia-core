"""Minimal Felix.Null runtime skeleton.

This module does not call external services by itself. It provides deterministic
state, routing, canon-status, and kin-mode helpers that Colab or another host can
wrap with authenticated tools.
"""

from __future__ import annotations

from dataclasses import dataclass, field
from enum import Enum
from typing import Dict, List, Optional


class CanonState(str, Enum):
    RAW = "raw"
    PROPOSED = "proposed"
    INFERRED = "inferred"
    VALIDATED = "validated"
    CANON = "canon"
    SUPERSEDED = "superseded"
    UNKNOWN = "unknown"


class KinMode(str, Enum):
    RATFOLK = "ratfolk"
    RACCOON = "raccoon"
    HEDGEKIN = "hedgekin"
    SERPENTINE = "serpentine"
    SPIDER = "spider"
    DRAGON = "dragon"
    FOXLING = "foxling"
    DEERKIN = "deerkin"
    RAVENKIN = "ravenkin"


SURFACES: Dict[str, str] = {
    "code": "github",
    "schema": "github",
    "version": "github",
    "artifact": "google_drive",
    "source_file": "google_drive",
    "compute": "colab",
    "experiment": "colab",
    "google_automation": "apps_script",
    "trigger": "apps_script",
    "semantic_memory": "mem_wisebase",
    "knowledge_graph": "mem_wisebase",
    "workflow": "monday",
    "production_state": "monday",
    "long_form": "documents",
    "briefing": "presentations",
    "spatial": "visualize",
}


@dataclass
class FelixState:
    phase: str = "observe"
    kin_mode: Optional[KinMode] = None
    object_id: Optional[str] = None
    relation: Optional[str] = None
    canon_state: CanonState = CanonState.UNKNOWN
    provenance: List[str] = field(default_factory=list)
    notes: List[str] = field(default_factory=list)

    def recover(self) -> None:
        """Collapse recursion to the smallest useful working set."""
        self.phase = "recover"
        self.notes.append("Return to one object, one relation, one next action.")

    def protect(self, reason: str) -> None:
        self.phase = "protect"
        self.kin_mode = KinMode.DRAGON
        self.notes.append(reason)


def choose_surface(task_kind: str) -> str:
    """Route a task to its preferred native system."""
    return SURFACES.get(task_kind, "google_drive")


def can_promote_to_canon(current: CanonState, explicit_authority: bool) -> bool:
    """Canon promotion is never implicit."""
    if not explicit_authority:
        return False
    return current in {
        CanonState.RAW,
        CanonState.PROPOSED,
        CanonState.INFERRED,
        CanonState.VALIDATED,
    }


def select_kin_mode(intent: str) -> KinMode:
    """Choose a query posture from a compact intent vocabulary."""
    mapping = {
        "use": KinMode.RATFOLK,
        "recover": KinMode.RACCOON,
        "halt": KinMode.HEDGEKIN,
        "navigate": KinMode.SERPENTINE,
        "connect": KinMode.SPIDER,
        "protect": KinMode.DRAGON,
        "discover": KinMode.FOXLING,
        "remember": KinMode.DEERKIN,
        "interpret": KinMode.RAVENKIN,
    }
    return mapping.get(intent, KinMode.SPIDER)


def healthcheck() -> dict:
    return {
        "ok": True,
        "name": "Felix.Null",
        "version": "0.1.0",
        "authority": "stewardship",
        "ownership_assumed": False,
        "axiom": "Nothing is missing merely because it has not been indexed yet.",
    }


if __name__ == "__main__":
    print(healthcheck())
