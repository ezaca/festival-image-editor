/**
 * @version 1.0.0.0
 * @copyright Copyright ©  2021
 * @compiler Bridge.NET 17.10.1
 */
Bridge.assembly("Festival_Bridge", function ($asm, globals) {
    "use strict";

    /** @namespace Festival_Bridge.Api.EditorComponents.Layers */

    /**
     * Represents a drawing layer that must be extended.
     *
     * @abstract
     * @class Festival_Bridge.Api.EditorComponents.Layers.CustomLayer
     */
    Bridge.define("Festival_Bridge.Api.EditorComponents.Layers.CustomLayer", {
        fields: {
            ParentCanvas: null,
            Name: null,
            Element: null
        },
        ctors: {
            ctor: function (canvas, name) {
                this.$initialize();
                this.ParentCanvas = canvas;
                this.Name = name;
            }
        },
        methods: {
            AddElement: function (elementOrSelector) {
                return $(elementOrSelector).appendTo(this.Element);
            }
        }
    });

    /** @namespace Festival_Bridge.Api.EditorComponents */

    /**
     * Controls the Stage, an element that has a Canvas and the space where
     the interactions of the pointer focused on the drawing occur.
     *
     * @class Festival_Bridge.Api.EditorComponents.Stage
     */
    Bridge.define("Festival_Bridge.Api.EditorComponents.Stage", {
        statics: {
            fields: {
                Current: null
            },
            ctors: {
                init: function () {
                    this.Current = new Festival_Bridge.Api.EditorComponents.Stage(null);
                }
            },
            methods: {
                Init: function () { }
            }
        },
        fields: {
            Element: null,
            Canvas: null
        },
        ctors: {
            ctor: function (element) {
                this.$initialize();
                this.Element = element;
                $(Bridge.fn.cacheBind(this, this.InitializeStage));
            }
        },
        methods: {
            InitializeStage: function () {
                if (this.Element == null) {
                    this.Element = $(".stage").first();
                }

                this.Element.data("instance", this);
                this.Canvas = new Festival_Bridge.Api.EditorComponents.StageCanvas(this.Element.children(".canvas"));
                this.CenterScroll();
            },
            CenterScroll: function () {
                var el = Bridge.cast(Festival_Bridge.Api.Elements.ElementsManager.Viewport.get(0), HTMLElement);

                el.scrollTop = el.scrollHeight;
                el.scrollTop = (Bridge.Int.div(el.scrollTop, 2)) | 0;

                el.scrollLeft = el.scrollWidth;
                el.scrollLeft = (Bridge.Int.div(el.scrollLeft, 2)) | 0;
            }
        }
    });

    /**
     * Controls the Canvas where the layers of the drawing will be built.
     *
     * @class Festival_Bridge.Api.EditorComponents.StageCanvas
     */
    Bridge.define("Festival_Bridge.Api.EditorComponents.StageCanvas", {
        fields: {
            Element: null,
            Layers: null,
            CurrentLayer: null
        },
        props: {
            CurrentLayerAsSVG: {
                get: function () {
                    return Bridge.cast(this.CurrentLayer, Festival_Bridge.Api.EditorComponents.Layers.SvgLayer);
                }
            },
            ParentStage: {
                get: function () {
                    return Bridge.as(this.Element.parent(".stage").data("instance"), Festival_Bridge.Api.EditorComponents.Stage);
                }
            }
        },
        ctors: {
            init: function () {
                this.Layers = new (System.Collections.Generic.List$1(Festival_Bridge.Api.EditorComponents.Layers.CustomLayer)).ctor();
            },
            ctor: function (element) {
                this.$initialize();
                this.Element = element;
                this.Element.data("instance", this);
                this.CreateSvgLayer("Default");
            }
        },
        methods: {
            CreateSvgLayer: function (name) {
                var layer = new Festival_Bridge.Api.EditorComponents.Layers.SvgLayer(this, name);
                this.Layers.add(layer);
                this.CurrentLayer = layer;
                return layer;
            }
        }
    });

    /** @namespace Festival_Bridge.Api.Elements */

    /**
     * Contains references to the main elements of the application.
     *
     * @class Festival_Bridge.Api.Elements.ElementsManager
     */
    Bridge.define("Festival_Bridge.Api.Elements.ElementsManager", {
        statics: {
            fields: {
                Instance: null
            },
            props: {
                Body: {
                    get: function () {
                        return Festival_Bridge.Api.Elements.ElementsManager.Instance.body;
                    }
                },
                MainMenu: {
                    get: function () {
                        return Festival_Bridge.Api.Elements.ElementsManager.Instance.mainMenu;
                    }
                },
                Viewport: {
                    get: function () {
                        return Festival_Bridge.Api.Elements.ElementsManager.Instance.viewport;
                    }
                },
                ViewportStage: {
                    get: function () {
                        return Festival_Bridge.Api.Elements.ElementsManager.Instance.viewportStage;
                    }
                },
                ViewportCanvas: {
                    get: function () {
                        return Festival_Bridge.Api.Elements.ElementsManager.Instance.viewportCanvas;
                    }
                },
                ViewportPointerArea: {
                    get: function () {
                        return Festival_Bridge.Api.Elements.ElementsManager.Instance.viewportPointerArea;
                    }
                },
                MainEditorArea: {
                    get: function () {
                        return Festival_Bridge.Api.Elements.ElementsManager.Instance.mainEditorArea;
                    }
                },
                FarLeftArea: {
                    get: function () {
                        return Festival_Bridge.Api.Elements.ElementsManager.Instance.farLeftArea;
                    }
                },
                LeftArea: {
                    get: function () {
                        return Festival_Bridge.Api.Elements.ElementsManager.Instance.leftArea;
                    }
                },
                RightArea: {
                    get: function () {
                        return Festival_Bridge.Api.Elements.ElementsManager.Instance.rightArea;
                    }
                },
                FarRightArea: {
                    get: function () {
                        return Festival_Bridge.Api.Elements.ElementsManager.Instance.farRightArea;
                    }
                },
                BottomArea: {
                    get: function () {
                        return Festival_Bridge.Api.Elements.ElementsManager.Instance.bottomArea;
                    }
                },
                PopupsArea: {
                    get: function () {
                        return Festival_Bridge.Api.Elements.ElementsManager.Instance.popupsArea;
                    }
                }
            },
            ctors: {
                init: function () {
                    this.Instance = new Festival_Bridge.Api.Elements.ElementsManager();
                }
            },
            methods: {
                Init: function () { }
            }
        },
        fields: {
            body: null,
            mainMenu: null,
            viewport: null,
            viewportStage: null,
            viewportCanvas: null,
            viewportPointerArea: null,
            mainEditorArea: null,
            farLeftArea: null,
            leftArea: null,
            rightArea: null,
            farRightArea: null,
            bottomArea: null,
            popupsArea: null
        },
        ctors: {
            ctor: function () {
                this.$initialize();
                $(Bridge.fn.cacheBind(this, this.Initialize));
            }
        },
        methods: {
            Initialize: function () {
                this.body = $("body");
                this.mainMenu = $("body > main > header");
                this.viewport = $("body > main > .viewport");
                this.viewportStage = $("body > main > .viewport > .stage");
                this.viewportCanvas = $("body > main > .viewport > .stage > .canvas");
                this.viewportPointerArea = $("body > main > .viewport .editor-mouse");
                this.farLeftArea = $("body > main > .docksite-farleft");
                this.leftArea = $("body > main > .docksite-left");
                this.rightArea = $("body > main > .docksite-right");
                this.farRightArea = $("body > main > .docksite-farright");
                this.bottomArea = $("body > main > .docksite-bottom");
                this.mainEditorArea = $("body > main > .docksite-main");
                this.popupsArea = $("body > .popups");
            }
        }
    });

    /**
     * Manages the main menu.
     *
     * @class Festival_Bridge.Api.Elements.MainMenuManager
     */
    Bridge.define("Festival_Bridge.Api.Elements.MainMenuManager", {
        statics: {
            fields: {
                Instance: null
            },
            ctors: {
                init: function () {
                    this.Instance = new Festival_Bridge.Api.Elements.MainMenuManager();
                }
            },
            methods: {
                Init: function () {
                    $(function () {
                            Festival_Bridge.Api.Elements.ElementsManager.MainMenu.on("click", "a[data-popup]", Bridge.fn.$build([Festival_Bridge.Api.Elements.MainMenuManager.OnClickMainMenu]));
                        });
                },
                OnClickMainMenu: function (e) {
                    e.preventDefault();
                    var target = $(e.target);
                    var popupName = target.attr("data-popup");
                    Festival_Bridge.Api.Popups.PopupManager.Instance.OpenPopupBelow(popupName, Bridge.cast(target.get(0), HTMLElement));
                }
            }
        }
    });

    Bridge.define("Festival_Bridge.Api.Elements.PointerSignalBase", {
        fields: {
            ViewportX: 0,
            ViewportY: 0,
            CtrlKey: false,
            ShiftKey: false,
            AltKey: false
        },
        props: {
            StageX: {
                get: function () {
                    return Festival_Bridge.Api.Elements.PointerUtils.StageXToCanvasX(this.ViewportX);
                }
            },
            StageY: {
                get: function () {
                    return Festival_Bridge.Api.Elements.PointerUtils.StageYToCanvasY(this.ViewportY);
                }
            }
        }
    });

    /**
     * Utilities to manage the pointer.
     *
     * @static
     * @abstract
     * @class Festival_Bridge.Api.Elements.PointerUtils
     */
    Bridge.define("Festival_Bridge.Api.Elements.PointerUtils", {
        statics: {
            methods: {
                PageXYToStageXY: function (pageX, pageY, stageX, stageY) {
                    var offset = Festival_Bridge.Api.Elements.ElementsManager.ViewportStage.offset();
                    stageX.v = (((pageX - offset.left) | 0) + Festival_Bridge.Api.Elements.ElementsManager.ViewportStage.scrollLeft()) | 0;
                    stageY.v = (((pageY - offset.top) | 0) + Festival_Bridge.Api.Elements.ElementsManager.ViewportStage.scrollTop()) | 0;
                },
                PageXYToCanvasXY: function (pageX, pageY, canvasX, canvasY) {
                    var stageX = { };
                    var stageY = { };
                    Festival_Bridge.Api.Elements.PointerUtils.PageXYToStageXY(pageX, pageY, stageX, stageY);
                    Festival_Bridge.Api.Elements.PointerUtils.StageXYToCanvasXY(stageX.v, stageY.v, canvasX, canvasY);
                },
                StageXYToCanvasXY: function (stageX, stageY, canvasX, canvasY) {
                    var position = Festival_Bridge.Api.Elements.ElementsManager.ViewportCanvas.position();
                    canvasX.v = (stageX - position.left) | 0;
                    canvasY.v = (stageY - position.top) | 0;
                },
                StageXToCanvasX: function (stageX) {
                    var position = Festival_Bridge.Api.Elements.ElementsManager.ViewportCanvas.position();
                    return ((stageX - position.left) | 0);
                },
                StageYToCanvasY: function (stageY) {
                    var position = Festival_Bridge.Api.Elements.ElementsManager.ViewportCanvas.position();
                    return ((stageY - position.top) | 0);
                }
            }
        }
    });

    /**
     * Manages pointer events in the drawing area (Stage).
     *
     * @class Festival_Bridge.Api.Elements.ViewportPointerEvents
     */
    Bridge.define("Festival_Bridge.Api.Elements.ViewportPointerEvents", {
        statics: {
            fields: {
                isPointerDown: false,
                originalClickX: 0,
                originalClickY: 0,
                clickButton: 0,
                pointerUpLocally: false
            },
            ctors: {
                init: function () {
                    this.isPointerDown = false;
                    this.pointerUpLocally = false;
                }
            },
            methods: {
                Init: function () {
                    $(function () {
                            Festival_Bridge.Api.Elements.ViewportPointerEvents.Assign(Festival_Bridge.Api.Elements.ElementsManager.ViewportPointerArea, "pointerdown", Festival_Bridge.Api.Elements.ViewportPointerEvents.PointerDown);
                            Festival_Bridge.Api.Elements.ViewportPointerEvents.Assign(Festival_Bridge.Api.Elements.ElementsManager.ViewportPointerArea, "pointermove", Festival_Bridge.Api.Elements.ViewportPointerEvents.PointerMove);
                            Festival_Bridge.Api.Elements.ViewportPointerEvents.Assign(Festival_Bridge.Api.Elements.ElementsManager.ViewportPointerArea, "pointerup", Festival_Bridge.Api.Elements.ViewportPointerEvents.PointerUp);
                            Festival_Bridge.Api.Elements.ViewportPointerEvents.Assign(Festival_Bridge.Api.Elements.ElementsManager.ViewportPointerArea, "contextmenu", Festival_Bridge.Api.Elements.ViewportPointerEvents.PreventDefault);
                            Festival_Bridge.Api.Elements.ViewportPointerEvents.Assign(Festival_Bridge.Api.Elements.ElementsManager.Body, "pointerup", Festival_Bridge.Api.Elements.ViewportPointerEvents.PointerUpGlobally);
                        });
                },
                Assign: function (element, eventName, pointerEvent) {
                    element.on(eventName, pointerEvent);
                },
                PreventDefault: function (e) {
                    e.preventDefault();
                },
                PointerDown: function (e) {
                    var $t;
                    e.preventDefault();
                    Festival_Bridge.Api.Elements.ElementsManager.Viewport.focus();
                    var x = { };
                    var y = { };
                    Festival_Bridge.Api.Elements.PointerUtils.PageXYToStageXY(e.pageX, e.pageY, x, y);

                    if (Festival_Bridge.Api.Elements.ViewportPointerEvents.isPointerDown === false) {
                        Festival_Bridge.Api.Elements.ViewportPointerEvents.pointerUpLocally = false;
                        Festival_Bridge.Api.Elements.ViewportPointerEvents.isPointerDown = true;
                        Festival_Bridge.Api.Elements.ViewportPointerEvents.originalClickX = x.v;
                        Festival_Bridge.Api.Elements.ViewportPointerEvents.originalClickY = y.v;
                        Festival_Bridge.Api.Elements.ViewportPointerEvents.clickButton = e.button;
                        Festival_Bridge.Api.Events.EventManager.Dispatch(Festival_Bridge.Api.Elements.PointerDownSignal, ($t = new Festival_Bridge.Api.Elements.PointerDownSignal(), $t.AltKey = e.altKey, $t.CtrlKey = e.ctrlKey, $t.ShiftKey = e.shiftKey, $t.ViewportX = Festival_Bridge.Api.Elements.ViewportPointerEvents.originalClickX, $t.ViewportY = Festival_Bridge.Api.Elements.ViewportPointerEvents.originalClickY, $t.MouseButton = Festival_Bridge.Api.Elements.ViewportPointerEvents.clickButton, $t));
                    }
                },
                PointerUp: function (e) {
                    var $t;
                    e.preventDefault();
                    var x = { };
                    var y = { };
                    Festival_Bridge.Api.Elements.PointerUtils.PageXYToStageXY(e.pageX, e.pageY, x, y);
                    Festival_Bridge.Api.Elements.ViewportPointerEvents.pointerUpLocally = true;
                    if (Festival_Bridge.Api.Elements.ViewportPointerEvents.isPointerDown) {
                        Festival_Bridge.Api.Events.EventManager.Dispatch(Festival_Bridge.Api.Elements.PointerUpSignal, ($t = new Festival_Bridge.Api.Elements.PointerUpSignal(), $t.AltKey = e.altKey, $t.CtrlKey = e.ctrlKey, $t.ShiftKey = e.shiftKey, $t.AnchoredX = Festival_Bridge.Api.Elements.ViewportPointerEvents.originalClickX < x.v ? Festival_Bridge.Api.Elements.ViewportPointerEvents.originalClickX : x.v, $t.AnchoredY = Festival_Bridge.Api.Elements.ViewportPointerEvents.originalClickY < y.v ? Festival_Bridge.Api.Elements.ViewportPointerEvents.originalClickY : y.v, $t.ViewportX = x.v > Festival_Bridge.Api.Elements.ViewportPointerEvents.originalClickX ? x.v : Festival_Bridge.Api.Elements.ViewportPointerEvents.originalClickX, $t.ViewportY = y.v > Festival_Bridge.Api.Elements.ViewportPointerEvents.originalClickY ? y.v : Festival_Bridge.Api.Elements.ViewportPointerEvents.originalClickY, $t.MouseButton = Festival_Bridge.Api.Elements.ViewportPointerEvents.clickButton, $t.OriginalX = Festival_Bridge.Api.Elements.ViewportPointerEvents.originalClickX, $t.OriginalY = Festival_Bridge.Api.Elements.ViewportPointerEvents.originalClickY, $t.ActualX = x.v, $t.ActualY = y.v, $t.ActualButton = e.button, $t));
                    }
                },
                PointerUpGlobally: function (e) {
                    var $t;
                    var x = { };
                    var y = { };
                    Festival_Bridge.Api.Elements.PointerUtils.PageXYToStageXY(e.pageX, e.pageY, x, y);

                    if (Festival_Bridge.Api.Elements.ViewportPointerEvents.isPointerDown && Festival_Bridge.Api.Elements.ViewportPointerEvents.pointerUpLocally === false) {
                        Festival_Bridge.Api.Events.EventManager.Dispatch(Festival_Bridge.Api.Elements.PointerUpSignal, ($t = new Festival_Bridge.Api.Elements.PointerUpSignal(), $t.AltKey = e.altKey, $t.CtrlKey = e.ctrlKey, $t.ShiftKey = e.shiftKey, $t.AnchoredX = Festival_Bridge.Api.Elements.ViewportPointerEvents.originalClickX < x.v ? Festival_Bridge.Api.Elements.ViewportPointerEvents.originalClickX : x.v, $t.AnchoredY = Festival_Bridge.Api.Elements.ViewportPointerEvents.originalClickY < y.v ? Festival_Bridge.Api.Elements.ViewportPointerEvents.originalClickY : y.v, $t.ViewportX = x.v > Festival_Bridge.Api.Elements.ViewportPointerEvents.originalClickX ? x.v : Festival_Bridge.Api.Elements.ViewportPointerEvents.originalClickX, $t.ViewportY = y.v > Festival_Bridge.Api.Elements.ViewportPointerEvents.originalClickY ? y.v : Festival_Bridge.Api.Elements.ViewportPointerEvents.originalClickY, $t.MouseButton = Festival_Bridge.Api.Elements.ViewportPointerEvents.clickButton, $t.OriginalX = Festival_Bridge.Api.Elements.ViewportPointerEvents.originalClickX, $t.OriginalY = Festival_Bridge.Api.Elements.ViewportPointerEvents.originalClickY, $t.ActualX = x.v, $t.ActualY = y.v, $t.ActualButton = e.button, $t));
                    }

                    if (Festival_Bridge.Api.Elements.ViewportPointerEvents.isPointerDown) {
                        e.preventDefault();
                        Festival_Bridge.Api.Elements.ViewportPointerEvents.isPointerDown = false;
                    }
                },
                PointerMove: function (e) {
                    var $t;
                    e.preventDefault();
                    var x = { };
                    var y = { };
                    Festival_Bridge.Api.Elements.PointerUtils.PageXYToStageXY(e.pageX, e.pageY, x, y);

                    if (Festival_Bridge.Api.Elements.ViewportPointerEvents.isPointerDown) {
                        Festival_Bridge.Api.Events.EventManager.Dispatch(Festival_Bridge.Api.Elements.PointerDragSignal, ($t = new Festival_Bridge.Api.Elements.PointerDragSignal(), $t.AltKey = e.altKey, $t.CtrlKey = e.ctrlKey, $t.ShiftKey = e.shiftKey, $t.AnchoredX = Festival_Bridge.Api.Elements.ViewportPointerEvents.originalClickX < x.v ? Festival_Bridge.Api.Elements.ViewportPointerEvents.originalClickX : x.v, $t.AnchoredY = Festival_Bridge.Api.Elements.ViewportPointerEvents.originalClickY < y.v ? Festival_Bridge.Api.Elements.ViewportPointerEvents.originalClickY : y.v, $t.ViewportX = x.v > Festival_Bridge.Api.Elements.ViewportPointerEvents.originalClickX ? x.v : Festival_Bridge.Api.Elements.ViewportPointerEvents.originalClickX, $t.ViewportY = y.v > Festival_Bridge.Api.Elements.ViewportPointerEvents.originalClickY ? y.v : Festival_Bridge.Api.Elements.ViewportPointerEvents.originalClickY, $t.MouseButton = Festival_Bridge.Api.Elements.ViewportPointerEvents.clickButton, $t.OriginalX = Festival_Bridge.Api.Elements.ViewportPointerEvents.originalClickX, $t.OriginalY = Festival_Bridge.Api.Elements.ViewportPointerEvents.originalClickY, $t.ActualX = x.v, $t.ActualY = y.v, $t.ActualButton = e.button, $t));
                    } else {
                        Festival_Bridge.Api.Events.EventManager.Dispatch(Festival_Bridge.Api.Elements.PointerHoverSignal, ($t = new Festival_Bridge.Api.Elements.PointerHoverSignal(), $t.AltKey = e.altKey, $t.CtrlKey = e.ctrlKey, $t.ShiftKey = e.shiftKey, $t.ViewportX = x.v, $t.ViewportY = y.v, $t));
                    }
                }
            }
        }
    });

    Bridge.define("Festival_Bridge.Api.Events.EventData");

    /** @namespace Festival_Bridge.Api.Events */

    /**
     * Object capable of emitting and registering listeners of custom events.
     Listeners register for events represented by the type the object being
     dispatched. These objects are from custom classes containing
     information about the event.
     *
     * @class Festival_Bridge.Api.Events.EventManager
     */
    Bridge.define("Festival_Bridge.Api.Events.EventManager", {
        statics: {
            fields: {
                events: null
            },
            ctors: {
                init: function () {
                    this.events = new (System.Collections.Generic.Dictionary$2(System.Type,System.Collections.Generic.List$1(Function))).ctor();
                }
            },
            methods: {
                Init: function () { },
                On: function (T, action) {
                    if (Festival_Bridge.Api.Events.EventManager.events.containsKey(T) === false) {
                        Festival_Bridge.Api.Events.EventManager.events.add(T, new (System.Collections.Generic.List$1(Function)).ctor());
                    }

                    Festival_Bridge.Api.Events.EventManager.events.getItem(T).add(action);
                },
                Off: function (T, action) {
                    if (Festival_Bridge.Api.Events.EventManager.events.containsKey(T) === false) {
                        return;
                    }

                    if (Festival_Bridge.Api.Events.EventManager.events.getItem(T).remove(action) === false) {
                        Bridge.Console.error(System.String.format("Could not remove Action<{0}> from event", [T]));
                    }
                },
                Dispatch: function (T, eventData) {
                    if (Festival_Bridge.Api.Events.EventManager.events.containsKey(T) === false) {
                        return;
                    }

                    for (var i = 0; i < Festival_Bridge.Api.Events.EventManager.events.getItem(T).Count; i = (i + 1) | 0) {
                        try {
                            Festival_Bridge.Api.Events.EventManager.events.getItem(T).getItem(i).call(null, eventData);
                        } catch (e) {
                            e = System.Exception.create(e);
                            Bridge.Console.error(System.String.format("On event {0}, listener exception: {1}", T, e));
                        }
                    }
                }
            }
        }
    });

    /** @namespace Festival_Bridge.Api */

    /**
     * Do one access for each static to force their creation. It may seem
     somewhat hacky, but man, it worked smoothly so far!
     *
     * @class Festival_Bridge.Api.InitAll
     */
    Bridge.define("Festival_Bridge.Api.InitAll", {
        statics: {
            methods: {
                InitializeAll: function () {
                    Festival_Bridge.Api.Events.EventManager.Init();
                    Festival_Bridge.Api.Elements.ElementsManager.Init();
                    Festival_Bridge.Api.Elements.ViewportPointerEvents.Init();
                    Festival_Bridge.Api.Elements.MainMenuManager.Init();
                    Festival_Bridge.Api.Toolbars.ToolbarsManager.Init();
                    Festival_Bridge.Api.Tools.ToolManager.Init();
                    Festival_Bridge.Api.EditorComponents.Stage.Init();
                    Festival_Bridge.Api.Tabs.TabManager.Init();

                    Festival_Bridge.Tools.Index.Init();
                }
            }
        }
    });

    Bridge.define("Festival_Bridge.Api.ManagedActions.AbstractCustomManagedActionEvent", {
        fields: {
            ManagedAction: null
        }
    });

    /** @namespace Festival_Bridge.Api.ManagedActions */

    /**
     * Class to store a timeline of managed actions. Managed actions are
     commands or actions executed to compose the application features,
     including actions to draw elements, change attributes (color, line,
     etc.), delete elements and everything else. An advantage is the ability
     to undo, redo and repeat actions registered in this class.
     *
     * @class Festival_Bridge.Api.ManagedActions.ActionTimeline
     */
    Bridge.define("Festival_Bridge.Api.ManagedActions.ActionTimeline", {
        statics: {
            fields: {
                Instance: null
            },
            ctors: {
                init: function () {
                    this.Instance = new Festival_Bridge.Api.ManagedActions.ActionTimeline();
                }
            }
        },
        fields: {
            actions: null,
            Index: 0
        },
        props: {
            Top: {
                get: function () {
                    return this.actions.Count > 0 ? this.actions.getItem(this.Index) : null;
                }
            },
            CanRepeatAction: {
                get: function () {
                    return this.actions.Count > 0 ? Bridge.is(this.actions.getItem(this.Index), Festival_Bridge.Api.ManagedActions.IRepeatableManagedAction) : false;
                }
            }
        },
        ctors: {
            init: function () {
                this.actions = new (System.Collections.Generic.List$1(Festival_Bridge.Api.ManagedActions.IManagedAction)).ctor();
                this.Index = 0;
            }
        },
        methods: {
            Do: function (action, preventDoCall) {
                var $t;
                if (preventDoCall === void 0) { preventDoCall = false; }
                this.ClampActionsAfter(this.Index);

                this.actions.add(action);
                this.Index = (this.actions.Count - 1) | 0;

                if (preventDoCall === false) {
                    action.Festival_Bridge$Api$ManagedActions$IManagedAction$Do();
                }

                Festival_Bridge.Api.Events.EventManager.Dispatch(Festival_Bridge.Api.ManagedActions.OnRegisterManagedActionEvent, ($t = new Festival_Bridge.Api.ManagedActions.OnRegisterManagedActionEvent(), $t.ManagedAction = action, $t));
            },
            Undo: function () {
                var $t;
                if (this.actions.Count === 0) {
                    return;
                }

                Festival_Bridge.Api.Events.EventManager.Dispatch(Festival_Bridge.Api.ManagedActions.OnBeforeUndoManagedActionEvent, ($t = new Festival_Bridge.Api.ManagedActions.OnBeforeUndoManagedActionEvent(), $t.ManagedAction = this.actions.getItem(this.Index), $t));
                if (this.actions.getItem(this.Index).Festival_Bridge$Api$ManagedActions$IManagedAction$Undo()) {
                    this.Index = (this.Index - 1) | 0;
                }
            },
            Redo: function () {
                var $t;
                if (this.Index < ((this.actions.Count - 1) | 0)) {
                    this.Index = (this.Index + 1) | 0;
                    this.actions.getItem(this.Index).Festival_Bridge$Api$ManagedActions$IManagedAction$Do();
                    Festival_Bridge.Api.Events.EventManager.Dispatch(Festival_Bridge.Api.ManagedActions.OnAfterRedoManagedActionEvent, ($t = new Festival_Bridge.Api.ManagedActions.OnAfterRedoManagedActionEvent(), $t.ManagedAction = this.actions.getItem(this.Index), $t));
                }
            },
            Repeat: function () {
                var $t;
                if (this.actions.Count === 0) {
                    return;
                }
                var repeatable;
                if (((repeatable = Bridge.as(this.actions.getItem(this.Index), Festival_Bridge.Api.ManagedActions.IRepeatableManagedAction))) != null) {
                    this.ClampActionsAfter(this.Index);
                    var clone = repeatable.Festival_Bridge$Api$ManagedActions$IRepeatableManagedAction$Clone();
                    this.Do(clone);
                    Festival_Bridge.Api.Events.EventManager.Dispatch(Festival_Bridge.Api.ManagedActions.OnRepeatManagedActionEvent, ($t = new Festival_Bridge.Api.ManagedActions.OnRepeatManagedActionEvent(), $t.PrototypeAction = repeatable, $t.ClonedAction = clone, $t));
                }
            },
            ClampActionsAfter: function (index) {
                for (var i = (this.actions.Count - 1) | 0; i > index; i = (i - 1) | 0) {
                    this.actions.removeAt(i);
                }
            }
        }
    });

    /**
     * Describes the interface of a managed action that can be done and
     undone. Here, "done" includes to redo an action. Should be combinated
     with {@link }.
     *
     * @abstract
     * @class Festival_Bridge.Api.ManagedActions.IManagedAction
     */
    Bridge.define("Festival_Bridge.Api.ManagedActions.IManagedAction", {
        $kind: "interface"
    });

    Bridge.define("Festival_Bridge.Api.ManagedActions.OnRepeatManagedActionEvent", {
        fields: {
            PrototypeAction: null,
            ClonedAction: null
        }
    });

    Bridge.define("Festival_Bridge.Api.Popups.PopupManager", {
        statics: {
            fields: {
                /**
                 * Does not need to be initiated at start, only at use.
                 *
                 * @static
                 * @public
                 * @memberof Festival_Bridge.Api.Popups.PopupManager
                 * @type Festival_Bridge.Api.Popups.PopupManager
                 */
                Instance: null
            },
            ctors: {
                init: function () {
                    this.Instance = new Festival_Bridge.Api.Popups.PopupManager();
                }
            }
        },
        fields: {
            overlay: null
        },
        ctors: {
            ctor: function () {
                this.$initialize();
                $(Bridge.fn.bind(this, function () {
                        this.overlay = Bridge.cast(Festival_Bridge.Api.Elements.ElementsManager.PopupsArea.children(".overlay").get(0), HTMLElement);
                        this.overlay.addEventListener("mousedown", Bridge.fn.cacheBind(this, this.OnClickOverlay));
                    }));
            }
        },
        methods: {
            CreateCustomPopup: function (name) {
                var $t;
                var el = ($t = $.parseHTML(System.String.format("<div class='popup' data-popup='{0}'></div>", [name])))[System.Array.index(0, $t)];
                Festival_Bridge.Api.Elements.ElementsManager.PopupsArea.prepend(el);
                return Bridge.cast(el, HTMLDivElement);
            },
            CreateBasicPopup: function (name, list) {
                var $t;
                var items = System.Array.convertAll(list, function (item) {
                        if (Bridge.referenceEquals(item, "")) {
                            return System.String.format("<hr>", null);
                        } else {
                            return System.String.format("<a href=''>{0}</a>", [item]);
                        }
                    });
                var el = ($t = $.parseHTML(System.String.format("<div class='popup basic' data-popup='{0}'>{1}</div>", name, (items).join("\n"))))[System.Array.index(0, $t)];
                Festival_Bridge.Api.Elements.ElementsManager.PopupsArea.prepend(el);
                return Bridge.cast(el, HTMLDivElement);
            },
            GetPopup: function (name) {
                var popup = Festival_Bridge.Api.Elements.ElementsManager.PopupsArea.find(System.String.format("[data-popup=\"{0}\"]", [name]));
                return Bridge.as(popup.get(0), HTMLDivElement);
            },
            ClosePopups: function () {
                Festival_Bridge.Api.Elements.ElementsManager.PopupsArea.find(".popup").removeClass("open");
            },
            OpenPopupAt: function (name, x, y) {
                this.ClosePopups();
                var el = this.GetPopup(name);
                if (el != null) {
                    el.style.left = System.String.format("{0}px", [Bridge.box(x, System.Int32)]);
                    el.style.top = System.String.format("{0}px", [Bridge.box(y, System.Int32)]);
                    el.classList.add("open");
                }
            },
            OpenPopupBelow: function (name, element) {
                this.ClosePopups();
                this.OpenPopupAt(name, element.offsetLeft, ((element.offsetTop + element.offsetHeight) | 0));
            },
            OpenPopupBelow$1: function (name, element) {
                this.ClosePopups();
                this.OpenPopupBelow(name, Bridge.cast(element.get(0), HTMLElement));
            },
            OnClickOverlay: function (ev) {
                System.Console.WriteLine("Click overlay");
                ev.preventDefault();
                this.ClosePopups();
            }
        }
    });

    /** @namespace Festival_Bridge.Api.Tabs */

    /**
     * Manages a page in the tabs of property areas. Each page can be docked
     to a tab ({@link }) and contain custom UI.
     *
     * @class Festival_Bridge.Api.Tabs.PageManager
     */
    Bridge.define("Festival_Bridge.Api.Tabs.PageManager", {
        fields: {
            Element: null
        },
        ctors: {
            ctor: function (page) {
                this.$initialize();
                this.Element = page;

                if (page.hasClass("page") === false || Bridge.referenceEquals(page.attr("data-pageid"), "")) {
                    throw new System.Exception(System.String.format("Given element is not an actual page", null));
                }

                if (page.length > 1) {
                    throw new System.Exception(System.String.format("Too many pages selected at once, is pageid repeated across pages?", null));
                }
            }
        },
        methods: {
            GetCurrentTab: function () {
                return this.Element.parent(".tab[data-tabid]");
            },
            DockTo: function (tab) {
                Festival_Bridge.Api.Tabs.TabManager.Instance.RefreshTabHeader(tab);
                tab.append(this.Element);
            },
            DockTo$1: function (tabId) {
                this.DockTo($(System.String.format(".tab[data-tabid='{0}']", [tabId])));
            },
            Show: function () {
                Festival_Bridge.Api.Tabs.TabManager.Instance.ShowTab(this.GetCurrentTab(), this.Element);
            }
        }
    });

    /**
     * Manages tabs of property windows present in the side dockable panels.
     Each tab is a panel with a header and many pages.
     *
     * @class Festival_Bridge.Api.Tabs.TabManager
     */
    Bridge.define("Festival_Bridge.Api.Tabs.TabManager", {
        statics: {
            fields: {
                Instance: null
            },
            ctors: {
                init: function () {
                    this.Instance = new Festival_Bridge.Api.Tabs.TabManager();
                }
            },
            methods: {
                Init: function () {
                    $(function () {
                            Festival_Bridge.Api.Tabs.TabManager.Instance.Mount("right", Festival_Bridge.Api.Elements.ElementsManager.RightArea);
                            Festival_Bridge.Api.Tabs.TabManager.Instance.Mount("bottom", Festival_Bridge.Api.Elements.ElementsManager.BottomArea);
                        });
                }
            }
        },
        methods: {
            GetTabElement: function (tabId) {
                return $(System.String.format(".tab[data-tabid='{0}']", [tabId]));
            },
            GetPage$1: function (tabId, pageId) {
                return new Festival_Bridge.Api.Tabs.PageManager($(System.String.format(".tab[data-tabid='{0}'] > .page[data-pageid='{1}']", tabId, pageId)));
            },
            GetPage: function (pageId) {
                return new Festival_Bridge.Api.Tabs.PageManager($(System.String.format(".page[data-pageid='{0}']", [pageId])));
            },
            CreatePage: function (tabId, pageId) {
                var tab = this.GetTabElement(tabId);
                var page = new Festival_Bridge.Api.Tabs.PageManager(tab.append(System.String.format("<div class='tab' data-tabid='{0}'></div>", [pageId])));
                page.DockTo(tab);
                return page;

            },
            DeletePage: function (pageId) {
                var page = this.GetPage(pageId);
                var tab = page.GetCurrentTab();
                page.Element.remove();
                this.RefreshTabHeader(tab);
            },
            DeletePage$1: function (tabId, pageId) {
                var page = this.GetPage$1(tabId, pageId);
                var tab = page.GetCurrentTab();
                page.Element.remove();
                this.RefreshTabHeader(tab);
            },
            Mount: function (tabId, docksite) {
                var tab = docksite.children(System.String.format(".tab[data-tabid='{0}']", [tabId]));
                if (tab.length === 0) {
                    tab = docksite.append(System.String.format("<div class='tab' data-tabid='{0}'><header></header></div>", [tabId]));
                    tab.on("click", "header > a", Bridge.fn.$build([Bridge.fn.cacheBind(this, this.OnClickTabHeader)]));
                } else {
                    this.RefreshTabHeader(tab.first());
                    tab.off("click", "header > a");
                    tab.on("click", "header > a", Bridge.fn.$build([Bridge.fn.cacheBind(this, this.OnClickTabHeader)]));
                }
            },
            RefreshTabHeader: function (tabElement) {
                var pages = tabElement.children(".page");
                var header = tabElement.children("header");
                header.remove("a");
                pages.each(function (pid, page) {
                    var jpage = $(page);
                    header.append(System.String.format("<a href='' data-pageid='{0}'>{1}</a>", jpage.attr("data-pageid"), jpage.attr("data-page-title")));
                });

                var active = tabElement.children(".page.active");
                if (active.length === 0) {
                    active = pages.first();
                }
                this.ShowTab(tabElement, active);
            },
            ShowTab: function (tab, page) {
                this.CloseTabs(tab);
                page.addClass("active");
                tab.children("header").children(System.String.format("a[data-pageid='{0}']", [page.attr("data-pageid")])).addClass("active");
            },
            CloseTabs: function (tab) {
                tab.children("header").children(".active").removeClass("active");
                tab.children(".active").removeClass("active");
            },
            OnClickTabHeader: function (e) {
                e.preventDefault();
                this.GetPage($(e.target).attr("data-pageid")).Show();
            }
        }
    });

    /** @namespace Festival_Bridge.Api.Toolbars */

    /**
     * A toolbar element mounted by the {@link }. It
     references an HTML element with the buttons and other elements.
     *
     * @class Festival_Bridge.Api.Toolbars.Toolbar
     */
    Bridge.define("Festival_Bridge.Api.Toolbars.Toolbar", {
        fields: {
            Element: null
        },
        ctors: {
            ctor: function (element) {
                this.$initialize();
                this.Element = element;
            }
        },
        methods: {
            FindElement: function (selector) {
                return this.Element.find(selector);
            },
            AddButton: function (hint, backgroundImage, onClick) {
                var button = $($.parseHTML(System.String.format("<a href='' class='toolbar-button' title='{0}'></a>", [hint])));
                this.Element.append(button);
                Bridge.cast(button.get(0), HTMLElement).style.backgroundImage = backgroundImage;
                button.on("click", onClick);
                return button;
            },
            AddSeparator: function () {
                this.Element.append("<hr>");
            },
            AddToolBoxButton: function (tool) {
                var button = Festival_Bridge.Api.Toolbars.ToolbarsManager.Instance.GetToolBox().AddButton(System.String.format("{0} ({1})", tool.Festival_Bridge$Api$Tools$ITool$DisplayName, Bridge.box(tool.Festival_Bridge$Api$Tools$ITool$HotKey, System.Char, String.fromCharCode, System.Char.getHashCode)), System.String.format("url(pictures/tools/{0}.png)", [tool.Festival_Bridge$Api$Tools$ITool$IconName]), function (e) {
                    e.preventDefault();
                    Festival_Bridge.Api.Tools.ToolManager.Instance.Select(tool);
                });
                button.attr("data-toolid", tool.Festival_Bridge$Api$Tools$ITool$ToolId);
                return button;
            }
        }
    });

    /**
     * Manages all the toolbars, including horizontal and vertical ones.
     Vertical toolbars are mostly used for the toolbar with the drawing
     tools. The toolbars try to be flexible and adapt its children elements
     for horizontal and vertical layouts.
     *
     * @class Festival_Bridge.Api.Toolbars.ToolbarsManager
     */
    Bridge.define("Festival_Bridge.Api.Toolbars.ToolbarsManager", {
        statics: {
            fields: {
                Instance: null
            },
            ctors: {
                init: function () {
                    this.Instance = new Festival_Bridge.Api.Toolbars.ToolbarsManager();
                }
            },
            methods: {
                Init: function () {
                    $(function () {
                            Festival_Bridge.Api.Toolbars.ToolbarsManager.Instance.Mount("tools", Festival_Bridge.Api.Elements.ElementsManager.LeftArea);
                        });
                }
            }
        },
        methods: {
            Mount: function (toolbarId, element) {
                element.append(System.String.format("<div class='toolbar' data-toolbarid='{0}'></div>", [toolbarId]));
            },
            GetToolbar: function (toolbarId) {
                return new Festival_Bridge.Api.Toolbars.Toolbar($(System.String.format(".toolbar[data-toolbarid='{0}']", [toolbarId])));
            },
            GetToolBox: function () {
                return this.GetToolbar("tools");
            }
        }
    });

    Bridge.define("Festival_Bridge.Api.Tools.CategoryName", {
        $kind: "enum",
        statics: {
            fields: {
                NoCategory: 0,
                Shape: 1
            }
        }
    });

    /** @namespace Festival_Bridge.Api.Tools */

    /**
     * Describes the interface of a drawing tool.
     *
     * @abstract
     * @class Festival_Bridge.Api.Tools.ITool
     */
    Bridge.define("Festival_Bridge.Api.Tools.ITool", {
        $kind: "interface"
    });

    /**
     * Manages the drawing tools.
     *
     * @class Festival_Bridge.Api.Tools.ToolManager
     */
    Bridge.define("Festival_Bridge.Api.Tools.ToolManager", {
        statics: {
            fields: {
                Instance: null
            },
            ctors: {
                init: function () {
                    this.Instance = new Festival_Bridge.Api.Tools.ToolManager();
                }
            },
            methods: {
                Init: function () { }
            }
        },
        fields: {
            Current: null,
            tools: null,
            toolsHotKeys: null
        },
        ctors: {
            init: function () {
                this.tools = new (System.Collections.Generic.List$1(Festival_Bridge.Api.Tools.ITool)).ctor();
                this.toolsHotKeys = new (System.Collections.Generic.Dictionary$2(System.Char,System.Collections.Generic.List$1(Festival_Bridge.Api.Tools.ITool))).ctor();
            }
        },
        methods: {
            Register: function (tool) {
                if (this.toolsHotKeys.containsKey(tool.Festival_Bridge$Api$Tools$ITool$HotKey) === false) {
                    this.toolsHotKeys.add(tool.Festival_Bridge$Api$Tools$ITool$HotKey, new (System.Collections.Generic.List$1(Festival_Bridge.Api.Tools.ITool)).ctor());
                }

                this.toolsHotKeys.getItem(tool.Festival_Bridge$Api$Tools$ITool$HotKey).add(tool);
                this.tools.add(tool);
                Festival_Bridge.Api.Toolbars.ToolbarsManager.Instance.GetToolBox().AddToolBoxButton(tool);
                tool.Festival_Bridge$Api$Tools$ITool$Awake();

                if (this.Current == null) {
                    this.Select(tool);
                }
            },
            Select: function (tool) {
                if (this.Current != null) {
                    Festival_Bridge.Api.Toolbars.ToolbarsManager.Instance.GetToolBox().FindElement(System.String.format("[data-toolid]", null)).removeClass("active");
                }

                this.Current != null ? this.Current.Festival_Bridge$Api$Tools$ITool$Disable() : null;
                this.Current = tool;
                this.Current.Festival_Bridge$Api$Tools$ITool$Enable();
                Festival_Bridge.Api.Toolbars.ToolbarsManager.Instance.GetToolBox().FindElement(System.String.format("[data-toolid='{0}']", [tool.Festival_Bridge$Api$Tools$ITool$ToolId])).addClass("active");
            },
            SelectByHotkey: function (hotkey) {
                var list = System.Collections.Generic.CollectionExtensions.GetValueOrDefault$1(System.Char, System.Collections.Generic.List$1(Festival_Bridge.Api.Tools.ITool), this.toolsHotKeys, hotkey, null);
                if (list == null || list.Count === 0) {
                    return false;
                }

                var index = list.indexOf(this.Current);
                if (index < 0 || index === ((list.Count - 1) | 0)) {
                    this.Select(list.getItem(0));
                } else {
                    this.Select(list.getItem(((index + 1) | 0)));
                }

                return true;
            }
        }
    });

    /**
     * Utilities to help the drawing tools.
     *
     * @static
     * @abstract
     * @class Festival_Bridge.Api.Tools.ToolUtils
     */
    Bridge.define("Festival_Bridge.Api.Tools.ToolUtils", {
        statics: {
            fields: {
                SvgNamespace: null,
                ForegroundColor: null,
                BackgroundColor: null
            },
            ctors: {
                init: function () {
                    this.ForegroundColor = new Festival_Bridge.Api.Types.RGBA();
                    this.BackgroundColor = new Festival_Bridge.Api.Types.RGBA();
                    this.SvgNamespace = "http://www.w3.org/2000/svg";
                    this.ForegroundColor = Festival_Bridge.Api.Types.RGBA.op_Implicit("#000");
                    this.BackgroundColor = Festival_Bridge.Api.Types.RGBA.op_Implicit("#fff");
                }
            },
            methods: {
                ApplyUserStyle: function (style) {
                    style.fill = Festival_Bridge.Api.Types.RGBA.op_Implicit$1(Festival_Bridge.Api.Tools.ToolUtils.BackgroundColor.$clone());
                    style.stroke = Festival_Bridge.Api.Types.RGBA.op_Implicit$1(Festival_Bridge.Api.Tools.ToolUtils.ForegroundColor.$clone());
                }
            }
        }
    });

    /** @namespace Festival_Bridge.Api.Types */

    /**
     * This class is used by {@link } to describe the
     user selected foreground and background colors. It can implicitly
     convert to a CSS string, being it either an hexa representation
     (<pre><code>#......</code></pre>) or a RGBA representation with alpha channel
     (<pre><code>rgba(...,...,...,...)</code></pre>). The class can receive implicitly some
     CSS string formats, like the hexa # syntax and the rgb, hsl and rgba
     patterns.
     *
     * @class Festival_Bridge.Api.Types.RGBA
     */
    Bridge.define("Festival_Bridge.Api.Types.RGBA", {
        $kind: "struct",
        statics: {
            fields: {
                RedOffset: 0,
                GreenOffset: 0,
                BlueOffset: 0,
                AlphaOffset: 0
            },
            ctors: {
                init: function () {
                    this.RedOffset = 24;
                    this.GreenOffset = 16;
                    this.BlueOffset = 8;
                    this.AlphaOffset = 0;
                }
            },
            methods: {
                FromRGB: function (r, g, b, a) {
                    var $t;
                    if (a === void 0) { a = 255; }
                    return ($t = new Festival_Bridge.Api.Types.RGBA(), $t.Red = r, $t.Green = g, $t.Blue = b, $t.Alpha = a, $t);
                },
                FromHSL: function (h, s, l, a) {
                    if (a === void 0) { a = 255.0; }
                    return Festival_Bridge.Api.Types.RGBA.FromHexa((HslToHex(h, s, l) || "") + (System.String.alignString(System.Int32.format(Bridge.Int.clip32(a), "x"), 2, 48) || ""));
                },
                FromHexa: function (hexa) {
                    var value = hexa;
                    if (System.String.startsWith(value, "#")) {
                        value = value.substr(1);
                    }

                    if (value.length === 3) {
                        value = System.String.format("{0}{1}{2}{3}{4}{5}FF", Bridge.box(value.charCodeAt(0), System.Char, String.fromCharCode, System.Char.getHashCode), Bridge.box(value.charCodeAt(0), System.Char, String.fromCharCode, System.Char.getHashCode), Bridge.box(value.charCodeAt(1), System.Char, String.fromCharCode, System.Char.getHashCode), Bridge.box(value.charCodeAt(1), System.Char, String.fromCharCode, System.Char.getHashCode), Bridge.box(value.charCodeAt(2), System.Char, String.fromCharCode, System.Char.getHashCode), Bridge.box(value.charCodeAt(2), System.Char, String.fromCharCode, System.Char.getHashCode));
                    }

                    if (value.length === 4) {
                        value = System.String.format("{0}{1}{2}{3}{4}{5}{6}{7}", Bridge.box(value.charCodeAt(0), System.Char, String.fromCharCode, System.Char.getHashCode), Bridge.box(value.charCodeAt(0), System.Char, String.fromCharCode, System.Char.getHashCode), Bridge.box(value.charCodeAt(1), System.Char, String.fromCharCode, System.Char.getHashCode), Bridge.box(value.charCodeAt(1), System.Char, String.fromCharCode, System.Char.getHashCode), Bridge.box(value.charCodeAt(2), System.Char, String.fromCharCode, System.Char.getHashCode), Bridge.box(value.charCodeAt(2), System.Char, String.fromCharCode, System.Char.getHashCode), Bridge.box(value.charCodeAt(3), System.Char, String.fromCharCode, System.Char.getHashCode), Bridge.box(value.charCodeAt(3), System.Char, String.fromCharCode, System.Char.getHashCode));
                    }

                    if (value.length === 6) {
                        value = (value || "") + "FF";
                    }

                    var r = Number("0x" + (value.substr(0, 2) || ""));
                    var g = Number("0x" + (value.substr(2, 2) || ""));
                    var b = Number("0x" + (value.substr(4, 2) || ""));
                    var a = Number("0x" + (value.substr(6, 2) || ""));
                    return Festival_Bridge.Api.Types.RGBA.FromRGB(r, g, b, a);
                },
                op_Implicit$1: function (rgba) {
                    if (rgba.Alpha === 255) {
                        return System.String.format("#{0}{1}{2}", System.String.alignString(System.Byte.format(rgba.Red, "x"), 2, 48), System.String.alignString(System.Byte.format(rgba.Green, "x"), 2, 48), System.String.alignString(System.Byte.format(rgba.Blue, "x"), 2, 48));
                    } else {
                        return System.String.format("rgba({0},{1},{2},{3})", Bridge.box(rgba.Red, System.Byte), Bridge.box(rgba.Green, System.Byte), Bridge.box(rgba.Blue, System.Byte), Bridge.box(rgba.Alpha / 255.0, System.Single, System.Single.format, System.Single.getHashCode));
                    }
                },
                op_Implicit: function (value) {
                    if (System.String.startsWith(value, "#")) {
                        return Festival_Bridge.Api.Types.RGBA.FromHexa(value);
                    } else if (System.String.startsWith(value.toLowerCase(), "hsl")) {
                        var m = System.Text.RegularExpressions.Regex.match(value.trim().toLowerCase(), "hsl *\\( *(\\d*[.]\\d+|\\d+)(?:deg)? *, *(\\d*[.]\\d+|\\d+)%? *, *(\\d*[.]\\d+|\\d+)%? *(?:, *(\\d*[.]\\d+|\\d+) *)?\\)");
                        if (m.getGroups().get(4).getSuccess()) {
                            return Festival_Bridge.Api.Types.RGBA.FromHSL(Number(m.getGroups().get(1).getValue()), Number(m.getGroups().get(2).getValue()), Number(m.getGroups().get(3).getValue()), Number(m.getGroups().get(4).getValue()) * 255.0);
                        } else {
                            return Festival_Bridge.Api.Types.RGBA.FromHSL(Number(m.getGroups().get(1).getValue()), Number(m.getGroups().get(2).getValue()), Number(m.getGroups().get(3).getValue()));
                        }
                    } else if (System.String.startsWith(value.toLowerCase(), "rgba")) {
                        var m1 = System.Text.RegularExpressions.Regex.match(value.trim().toLowerCase(), "rgba *[(] *(\\d*[.]\\d+|\\d+) *, *(\\d*[.]\\d+|\\d+) *, *(\\d*[.]\\d+|\\d+) *, *(\\d*[.]\\d+|\\d+) *[)]");
                        return Festival_Bridge.Api.Types.RGBA.FromRGB(Number(m1.getGroups().get(1).getValue()), Number(m1.getGroups().get(2).getValue()), Number(m1.getGroups().get(3).getValue()), Bridge.Int.clipu8(Number(m1.getGroups().get(4).getValue()) * 255.0));
                    } else if (System.String.startsWith(value.toLowerCase(), "rgb")) {
                        var m2 = System.Text.RegularExpressions.Regex.match(value.trim().toLowerCase(), "rgb *[(] *(\\d*[.]\\d+|\\d+) *, *(\\d*[.]\\d+|\\d+) *, *(\\d*[.]\\d+|\\d+) *[)]");
                        return Festival_Bridge.Api.Types.RGBA.FromRGB(Number(m2.getGroups().get(1).getValue()), Number(m2.getGroups().get(2).getValue()), Number(m2.getGroups().get(3).getValue()));
                    } else {
                        throw new System.Exception("Not implemented RGBA converter for: " + (value || ""));
                    }
                },
                getDefaultValue: function () { return new Festival_Bridge.Api.Types.RGBA(); }
            }
        },
        fields: {
            Value: 0
        },
        props: {
            Red: {
                get: function () {
                    return (((((this.Value & 4278190080) >>> 0)) >>> Festival_Bridge.Api.Types.RGBA.RedOffset) & 255);
                },
                set: function (value) {
                    this.Value = (this.Value | (((value << Festival_Bridge.Api.Types.RGBA.RedOffset) >>> 0))) >>> 0;
                }
            },
            Green: {
                get: function () {
                    return (((((this.Value & 16711680) >>> 0)) >>> Festival_Bridge.Api.Types.RGBA.GreenOffset) & 255);
                },
                set: function (value) {
                    this.Value = (this.Value | (((value << Festival_Bridge.Api.Types.RGBA.GreenOffset) >>> 0))) >>> 0;
                }
            },
            Blue: {
                get: function () {
                    return (((((this.Value & 65280) >>> 0)) >>> Festival_Bridge.Api.Types.RGBA.BlueOffset) & 255);
                },
                set: function (value) {
                    this.Value = (this.Value | (((value << Festival_Bridge.Api.Types.RGBA.BlueOffset) >>> 0))) >>> 0;
                }
            },
            Alpha: {
                get: function () {
                    return (((((this.Value & 255) >>> 0)) >>> Festival_Bridge.Api.Types.RGBA.AlphaOffset) & 255);
                },
                set: function (value) {
                    this.Value = (this.Value | (((value << Festival_Bridge.Api.Types.RGBA.AlphaOffset) >>> 0))) >>> 0;
                }
            }
        },
        ctors: {
            ctor: function () {
                this.$initialize();
            }
        },
        methods: {
            toString: function () {
                return Festival_Bridge.Api.Types.RGBA.op_Implicit$1(this);
            },
            getHashCode: function () {
                var h = Bridge.addHash([1094862674, this.Value]);
                return h;
            },
            equals: function (o) {
                if (!Bridge.is(o, Festival_Bridge.Api.Types.RGBA)) {
                    return false;
                }
                return Bridge.equals(this.Value, o.Value);
            },
            $clone: function (to) {
                var s = to || new Festival_Bridge.Api.Types.RGBA();
                s.Value = this.Value;
                return s;
            }
        }
    });

    /** @namespace Festival_Bridge */

    /**
     * This is the Bridge.NET entry point.
     *
     * @public
     * @class Festival_Bridge.App
     */
    Bridge.define("Festival_Bridge.App", {
        main: function Main () {
            System.Console.WriteLine("Welcome to Bridge.NET");

            $(function () {
                    System.Console.WriteLine("jQuery started");
                    Festival_Bridge.Api.InitAll.InitializeAll();

                    $(Festival_Bridge.App.TestAndDebug);
                });





        },
        statics: {
            methods: {
                TestAndDebug: function () {
                    new Festival_Bridge.Debuggers.DebugPointerToCanvas();
                }
            }
        }
    });

    /** @namespace Festival_Bridge.Debuggers */

    /**
     * This class is for debugging and helps to see information about hand
     events in Stage and Canvas. It is intended for developers, not end
     users.
     *
     * @class Festival_Bridge.Debuggers.DebugPointerToCanvas
     */
    Bridge.define("Festival_Bridge.Debuggers.DebugPointerToCanvas", {
        ctors: {
            ctor: function () {
                this.$initialize();
                var debug = $("#debugArea");

                Festival_Bridge.Api.Events.EventManager.On(Festival_Bridge.Api.Elements.PointerDownSignal, Bridge.fn.bind(this, function (e) {
                    debug.children(".pointer-event").text("Down");
                    debug.children(".pointer-button").text(this.Modifiers(e));
                    debug.children(".pointer-start").text(System.String.format("({0}, {1})", Bridge.box(e.StageX, System.Int32), Bridge.box(e.StageY, System.Int32)));
                    debug.children(".pointer-end").text(System.String.format("n/a", null));
                    debug.children(".pointer-size").text(System.String.format("(0, 0)", null));
                }));

                Festival_Bridge.Api.Events.EventManager.On(Festival_Bridge.Api.Elements.PointerUpSignal, Bridge.fn.bind(this, function (e) {
                    debug.children(".pointer-event").text("Up");
                    debug.children(".pointer-button").text(this.Modifiers(e));
                    debug.children(".pointer-start").text(System.String.format("({0}, {1})", Bridge.box(e.AnchoredStageX, System.Int32), Bridge.box(e.AnchoredStageY, System.Int32)));
                    debug.children(".pointer-end").text(System.String.format("({0}, {1})", Bridge.box(e.StageX, System.Int32), Bridge.box(e.StageY, System.Int32)));
                    debug.children(".pointer-size").text(System.String.format("({0}, {1})", Bridge.box(e.Width, System.Int32), Bridge.box(e.Height, System.Int32)));
                }));

                Festival_Bridge.Api.Events.EventManager.On(Festival_Bridge.Api.Elements.PointerHoverSignal, Bridge.fn.bind(this, function (e) {
                    debug.children(".pointer-event").text("Hover");
                    debug.children(".pointer-button").text(this.Modifiers(e));
                    debug.children(".pointer-start").text(System.String.format("({0}, {1})", Bridge.box(e.StageX, System.Int32), Bridge.box(e.StageY, System.Int32)));
                    debug.children(".pointer-end").text(System.String.format("n/a", null));
                    debug.children(".pointer-size").text(System.String.format("n/a", null));
                }));

                Festival_Bridge.Api.Events.EventManager.On(Festival_Bridge.Api.Elements.PointerDragSignal, Bridge.fn.bind(this, function (e) {
                    debug.children(".pointer-event").text("Drag");
                    debug.children(".pointer-button").text(this.Modifiers(e));
                    debug.children(".pointer-start").text(System.String.format("({0}, {1})", Bridge.box(e.AnchoredStageX, System.Int32), Bridge.box(e.AnchoredStageY, System.Int32)));
                    debug.children(".pointer-end").text(System.String.format("({0}, {1})", Bridge.box(e.StageX, System.Int32), Bridge.box(e.StageY, System.Int32)));
                    debug.children(".pointer-size").text(System.String.format("({0}, {1})", Bridge.box(e.Width, System.Int32), Bridge.box(e.Height, System.Int32)));
                }));

                Festival_Bridge.Api.Events.EventManager.On(Festival_Bridge.Api.ManagedActions.OnRegisterManagedActionEvent, function (e) {
                    Bridge.Console.log(System.String.format("Undo {0}", [e.ManagedAction.Festival_Bridge$Api$ManagedActions$IManagedAction$DisplayName]));
                    var undo = $("#main-menu-undo").attr("title", System.String.format("Undo {0}", [e.ManagedAction.Festival_Bridge$Api$ManagedActions$IManagedAction$DisplayName]));
                });
            }
        },
        methods: {
            Modifiers: function (e) {
                var s = "";
                if (e.ShiftKey) {
                    s = (s || "") + "Shift+";
                }
                if (e.CtrlKey) {
                    s = (s || "") + "Ctrl+";
                }
                if (e.AltKey) {
                    s = (s || "") + "Alt+";
                }

                var mb = -1;
                var down;
                if (((down = Bridge.as(e, Festival_Bridge.Api.Elements.PointerDownSignal))) != null) {
                    mb = down.MouseButton;
                }
                var up;
                if (((up = Bridge.as(e, Festival_Bridge.Api.Elements.PointerUpSignal))) != null) {
                    mb = up.MouseButton;
                }
                var drag;
                if (((drag = Bridge.as(e, Festival_Bridge.Api.Elements.PointerDragSignal))) != null) {
                    mb = drag.MouseButton;
                }

                if (mb === -1) {
                    s = (s || "") + "None";
                }
                if (mb < -1 || mb > 3) {
                    s = (s || "") + (("Custom(" + mb + ")") || "");
                }
                if (mb === 0) {
                    s = (s || "") + "Left";
                }
                if (mb === 1) {
                    s = (s || "") + "Middle";
                }
                if (mb === 2) {
                    s = (s || "") + "Right";
                }

                return s;
            }
        }
    });

    /** @namespace Festival_Bridge.Languages */

    /**
     * A silly consideration about multi-language and internationalization. It
     is not currently in use.
     *
     * @static
     * @abstract
     * @class Festival_Bridge.Languages.Lang
     */
    Bridge.define("Festival_Bridge.Languages.Lang", {
        statics: {
            methods: {
                Translate: function (phrase) {
                    var hasKey = window.hasOwnProperty("lang") && window.lang.hasOwnProperty("current") && window.lang.current.hasOwnProperty(phrase);

                    return hasKey ? Bridge.cast(window.lang.current[phrase], System.String) : phrase;
                }
            }
        }
    });

    /** @namespace Festival_Bridge.Tools */

    /**
     * The index of tools currently active in the application. Each entry in
     its array represents a new tool available to use through an icon in the
     drawing tools toolbar.
     *
     * @class Festival_Bridge.Tools.Index
     */
    Bridge.define("Festival_Bridge.Tools.Index", {
        statics: {
            fields: {
                Tools: null
            },
            ctors: {
                init: function () {
                    this.Tools = System.Array.init([
                        new Festival_Bridge.Tools.DebugRectTool(), 
                        new Festival_Bridge.Tools.DebugRectTool(), 
                        new Festival_Bridge.Tools.RectTool()
                    ], Festival_Bridge.Api.Tools.ITool);
                }
            },
            methods: {
                Init: function () {
                    $(function () {
                            var $t;
                            $t = Bridge.getEnumerator(Festival_Bridge.Tools.Index.Tools);
                            try {
                                while ($t.moveNext()) {
                                    var tool = $t.Current;
                                    Festival_Bridge.Api.Tools.ToolManager.Instance.Register(tool);
                                }
                            } finally {
                                if (Bridge.is($t, System.IDisposable)) {
                                    $t.System$IDisposable$Dispose();
                                }
                            }
                        });
                }
            }
        }
    });

    /**
     * A Canvas drawing layer, capable of managing an SVG drawing.
     *
     * @class Festival_Bridge.Api.EditorComponents.Layers.SvgLayer
     * @augments Festival_Bridge.Api.EditorComponents.Layers.CustomLayer
     */
    Bridge.define("Festival_Bridge.Api.EditorComponents.Layers.SvgLayer", {
        inherits: [Festival_Bridge.Api.EditorComponents.Layers.CustomLayer],
        fields: {
            SvgElement: null
        },
        ctors: {
            ctor: function (canvas, name) {
                this.$initialize();
                Festival_Bridge.Api.EditorComponents.Layers.CustomLayer.ctor.call(this, canvas, name);
                this.SvgElement = document.createElementNS(Festival_Bridge.Api.Tools.ToolUtils.SvgNamespace, "svg");
                this.Element = $(this.SvgElement);
                this.Element.appendTo(canvas.Element);
            }
        }
    });

    Bridge.define("Festival_Bridge.Api.Elements.PointerAnchoredSignalBase", {
        inherits: [Festival_Bridge.Api.Elements.PointerSignalBase],
        fields: {
            AnchoredX: 0,
            AnchoredY: 0,
            OriginalX: 0,
            OriginalY: 0,
            ActualX: 0,
            ActualY: 0,
            ActualButton: 0
        },
        props: {
            Width: {
                get: function () {
                    return ((this.ViewportX - this.AnchoredX) | 0);
                }
            },
            Height: {
                get: function () {
                    return ((this.ViewportY - this.AnchoredY) | 0);
                }
            },
            AnchoredStageX: {
                get: function () {
                    return Festival_Bridge.Api.Elements.PointerUtils.StageXToCanvasX(this.AnchoredX);
                }
            },
            AnchoredStageY: {
                get: function () {
                    return Festival_Bridge.Api.Elements.PointerUtils.StageYToCanvasY(this.AnchoredY);
                }
            }
        }
    });

    Bridge.define("Festival_Bridge.Api.Elements.PointerDownSignal", {
        inherits: [Festival_Bridge.Api.Elements.PointerSignalBase],
        fields: {
            MouseButton: 0
        }
    });

    Bridge.define("Festival_Bridge.Api.Elements.PointerHoverSignal", {
        inherits: [Festival_Bridge.Api.Elements.PointerSignalBase]
    });

    Bridge.define("Festival_Bridge.Api.Events.EventData$1", function (T) { return {
        inherits: [Festival_Bridge.Api.Events.EventData]
    }; });

    /**
     * Describes an interface capable of repeating an action, doing it and
     doing it again. It's not about redoing an action, but applying it
     again, like blurring an image and blurring it again/more.
     *
     * @abstract
     * @class Festival_Bridge.Api.ManagedActions.IRepeatableManagedAction
     * @implements  Festival_Bridge.Api.ManagedActions.IManagedAction
     */
    Bridge.define("Festival_Bridge.Api.ManagedActions.IRepeatableManagedAction", {
        inherits: [Festival_Bridge.Api.ManagedActions.IManagedAction],
        $kind: "interface"
    });

    Bridge.define("Festival_Bridge.Api.ManagedActions.OnAfterRedoManagedActionEvent", {
        inherits: [Festival_Bridge.Api.ManagedActions.AbstractCustomManagedActionEvent]
    });

    Bridge.define("Festival_Bridge.Api.ManagedActions.OnBeforeUndoManagedActionEvent", {
        inherits: [Festival_Bridge.Api.ManagedActions.AbstractCustomManagedActionEvent]
    });

    Bridge.define("Festival_Bridge.Api.ManagedActions.OnRegisterManagedActionEvent", {
        inherits: [Festival_Bridge.Api.ManagedActions.AbstractCustomManagedActionEvent]
    });

    /** @namespace Festival_Bridge.ManagedActions.Base */

    /**
     * A managed action that creates SVG elements. This action is not used
     directly, but is the basis of drawing actions, such as the rectangle or
     ellipse tool.
     *
     * @abstract
     * @class Festival_Bridge.ManagedActions.Base.CreateSvgElement$1
     * @implements  Festival_Bridge.Api.ManagedActions.IManagedAction
     * @param   {Function}    [name]    The class of the SVG element.
     */
    Bridge.define("Festival_Bridge.ManagedActions.Base.CreateSvgElement$1", function (TSvg) { return {
        inherits: [Festival_Bridge.Api.ManagedActions.IManagedAction],
        fields: {
            Element: Bridge.getDefaultValue(TSvg),
            ParentElement: null,
            StartX: 0,
            StartY: 0,
            EndX: 0,
            EndY: 0
        },
        props: {
            Width: {
                get: function () {
                    return ((this.EndX - this.StartX) | 0);
                }
            },
            Height: {
                get: function () {
                    return ((this.EndY - this.StartY) | 0);
                }
            }
        },
        alias: [
            "Do", "Festival_Bridge$Api$ManagedActions$IManagedAction$Do",
            "Undo", "Festival_Bridge$Api$ManagedActions$IManagedAction$Undo"
        ],
        ctors: {
            ctor: function (parent) {
                this.$initialize();
                this.ParentElement = parent;
            }
        },
        methods: {
            RefreshElement: function (element) {
                Festival_Bridge.Api.Tools.ToolUtils.ApplyUserStyle(Untype(element).style);
            },
            Do: function () {
                this.Element = Untype(document.createElementNS(Festival_Bridge.Api.Tools.ToolUtils.SvgNamespace, this.SvgTagName));
                this.ParentElement.append(Untype(this.Element));
                this.RefreshElement(this.Element);
            },
            IsNullSize: function () {
                return this.Width === 0 || this.Height === 0;
            },
            SetSelectedRect: function (startX, startY, endX, endY) {
                this.StartX = startX;
                this.StartY = startY;
                this.EndX = endX;
                this.EndY = endY;
                this.RefreshElement(this.Element);
            },
            Undo: function () {
                if (this.Element != null) {
                    Untype(this.Element).remove();
                }
                this.Element = Bridge.getDefaultValue(TSvg);
                return true;
            }
        }
    }; });

    /**
     * A debug tool that draws a dotted rectangle like a selection tool, but
     it does nothing than showing the rectangle on pointer down and removing
     it on pointer up. It was the first and the inspirational tool.
     *
     * @class Festival_Bridge.Tools.DebugRectTool
     * @implements  Festival_Bridge.Api.Tools.ITool
     */
    Bridge.define("Festival_Bridge.Tools.DebugRectTool", {
        inherits: [Festival_Bridge.Api.Tools.ITool],
        fields: {
            element: null,
            borderColor: null
        },
        props: {
            ToolId: {
                get: function () {
                    return "debug-rect-" + Bridge.getHashCode(this);
                }
            },
            IconName: {
                get: function () {
                    return "icons8-cursor-32";
                }
            },
            HotKey: {
                get: function () {
                    return 86;
                }
            },
            DisplayName: {
                get: function () {
                    return "DebugRect";
                }
            },
            Category: {
                get: function () {
                    return Festival_Bridge.Api.Tools.CategoryName.NoCategory;
                }
            }
        },
        alias: [
            "ToolId", "Festival_Bridge$Api$Tools$ITool$ToolId",
            "IconName", "Festival_Bridge$Api$Tools$ITool$IconName",
            "HotKey", "Festival_Bridge$Api$Tools$ITool$HotKey",
            "DisplayName", "Festival_Bridge$Api$Tools$ITool$DisplayName",
            "Category", "Festival_Bridge$Api$Tools$ITool$Category",
            "Awake", "Festival_Bridge$Api$Tools$ITool$Awake",
            "Enable", "Festival_Bridge$Api$Tools$ITool$Enable",
            "Disable", "Festival_Bridge$Api$Tools$ITool$Disable"
        ],
        methods: {
            Awake: function () {
                var random = new System.Random.ctor();
                this.borderColor = System.String.format("hsl({0}, 100%, 40%)", [Bridge.box(random.Next$1(360), System.Int32)]);
            },
            Enable: function () {
                this.element = document.createElement("DIV");
                this.element.style.border = System.String.format("1px dashed {0}", [this.borderColor]);
                this.element.style.position = "absolute";
                this.element.style.display = "none";
                this.element.style.pointerEvents = "none";
                this.element.style.zIndex = "999999";
                this.SetDivPosition(0, 0, 0, 0);
                Festival_Bridge.Api.Elements.ElementsManager.ViewportStage.append(this.element);

                Festival_Bridge.Api.Events.EventManager.On(Festival_Bridge.Api.Elements.PointerDownSignal, Bridge.fn.cacheBind(this, this.PointerDown));
                Festival_Bridge.Api.Events.EventManager.On(Festival_Bridge.Api.Elements.PointerDragSignal, Bridge.fn.cacheBind(this, this.PointerDrag));
                Festival_Bridge.Api.Events.EventManager.On(Festival_Bridge.Api.Elements.PointerUpSignal, Bridge.fn.cacheBind(this, this.PointerUp));
            },
            Disable: function () {
                Festival_Bridge.Api.Events.EventManager.Off(Festival_Bridge.Api.Elements.PointerDownSignal, Bridge.fn.cacheBind(this, this.PointerDown));
                Festival_Bridge.Api.Events.EventManager.Off(Festival_Bridge.Api.Elements.PointerDragSignal, Bridge.fn.cacheBind(this, this.PointerDrag));
                Festival_Bridge.Api.Events.EventManager.Off(Festival_Bridge.Api.Elements.PointerUpSignal, Bridge.fn.cacheBind(this, this.PointerUp));
                this.element != null ? this.element.remove() : null;
                this.element = null;
            },
            PointerDown: function (e) {
                this.element.style.display = "";
                this.SetDivPosition(e.ViewportX, e.ViewportY, 0, 0);
            },
            PointerDrag: function (e) {
                this.SetDivPosition(e.AnchoredX, e.AnchoredY, e.Width, e.Height);
            },
            PointerUp: function (e) {
                this.element.style.display = "none";
            },
            SetDivPosition: function (x, y, width, height) {
                this.element.style.left = System.String.format("{0}px", [Bridge.box(x, System.Int32)]);
                this.element.style.top = System.String.format("{0}px", [Bridge.box(y, System.Int32)]);
                this.element.style.width = System.String.format("{0}px", [Bridge.box(width, System.Int32)]);
                this.element.style.height = System.String.format("{0}px", [Bridge.box(height, System.Int32)]);
            }
        }
    });

    /**
     * The rectangle drawing tool.
     *
     * @class Festival_Bridge.Tools.RectTool
     * @implements  Festival_Bridge.Api.Tools.ITool
     */
    Bridge.define("Festival_Bridge.Tools.RectTool", {
        inherits: [Festival_Bridge.Api.Tools.ITool],
        fields: {
            currentAction: null
        },
        props: {
            ToolId: {
                get: function () {
                    return "rect-" + Bridge.getHashCode(this);
                }
            },
            HotKey: {
                get: function () {
                    return 85;
                }
            },
            DisplayName: {
                get: function () {
                    return "Rectangle";
                }
            },
            IconName: {
                get: function () {
                    return "icons8-rectangular-32";
                }
            },
            Category: {
                get: function () {
                    return Festival_Bridge.Api.Tools.CategoryName.Shape;
                }
            }
        },
        alias: [
            "ToolId", "Festival_Bridge$Api$Tools$ITool$ToolId",
            "HotKey", "Festival_Bridge$Api$Tools$ITool$HotKey",
            "DisplayName", "Festival_Bridge$Api$Tools$ITool$DisplayName",
            "IconName", "Festival_Bridge$Api$Tools$ITool$IconName",
            "Category", "Festival_Bridge$Api$Tools$ITool$Category",
            "Awake", "Festival_Bridge$Api$Tools$ITool$Awake",
            "Enable", "Festival_Bridge$Api$Tools$ITool$Enable",
            "Disable", "Festival_Bridge$Api$Tools$ITool$Disable"
        ],
        methods: {
            Awake: function () { },
            Enable: function () {
                Festival_Bridge.Api.Events.EventManager.On(Festival_Bridge.Api.Elements.PointerDownSignal, Bridge.fn.cacheBind(this, this.OnPointerDown));
                Festival_Bridge.Api.Events.EventManager.On(Festival_Bridge.Api.Elements.PointerUpSignal, Bridge.fn.cacheBind(this, this.OnPointerUp));
                Festival_Bridge.Api.Events.EventManager.On(Festival_Bridge.Api.Elements.PointerDragSignal, Bridge.fn.cacheBind(this, this.OnPointerDrag));
            },
            Disable: function () {
                Festival_Bridge.Api.Events.EventManager.Off(Festival_Bridge.Api.Elements.PointerUpSignal, Bridge.fn.cacheBind(this, this.OnPointerUp));
                Festival_Bridge.Api.Events.EventManager.Off(Festival_Bridge.Api.Elements.PointerDownSignal, Bridge.fn.cacheBind(this, this.OnPointerDown));
                Festival_Bridge.Api.Events.EventManager.Off(Festival_Bridge.Api.Elements.PointerDragSignal, Bridge.fn.cacheBind(this, this.OnPointerDrag));
                this.currentAction = null;
            },
            OnPointerDown: function (ev) {
                if (this.currentAction != null) {
                    this.currentAction.Undo();
                }

                this.currentAction = new Festival_Bridge.ManagedActions.CreateSvgRect(Festival_Bridge.Api.EditorComponents.Stage.Current.Canvas.CurrentLayer.Element);
                this.currentAction.Do();
                this.currentAction.SetSelectedRect(ev.StageX, ev.StageY, ev.StageX, ev.StageY);
                this.currentAction.Element.style.pointerEvents = "none";
            },
            OnPointerUp: function (ev) {
                if (this.currentAction != null) {
                    if (ev.MouseButton !== ev.ActualButton) {
                        this.currentAction.Undo();
                    } else {
                        this.currentAction.SetSelectedRect(ev.AnchoredStageX, ev.AnchoredStageY, ev.StageX, ev.StageY);
                        this.ConfirmShape();
                    }
                    this.currentAction = null;
                }
            },
            ConfirmShape: function () {
                if (this.currentAction.IsNullSize()) {
                    this.currentAction.Undo();
                } else {
                    Festival_Bridge.Api.ManagedActions.ActionTimeline.Instance.Do(this.currentAction, true);
                }
            },
            OnPointerDrag: function (ev) {
                this.currentAction.SetSelectedRect(ev.AnchoredStageX, ev.AnchoredStageY, ev.StageX, ev.StageY);
            }
        }
    });

    /**
     * The old tool to draw rectangles, but it is abandoned because it does
     not use the {@link } and does
     not provide the history + undo/redo capacities. It also changes the SVG
     directly, which is undesired.
     *
     * @class Festival_Bridge.Tools.RectTool_OldManualMode
     * @implements  Festival_Bridge.Api.Tools.ITool
     */
    Bridge.define("Festival_Bridge.Tools.RectTool_OldManualMode", {
        inherits: [Festival_Bridge.Api.Tools.ITool],
        fields: {
            currentSvgRect: null
        },
        props: {
            ToolId: {
                get: function () {
                    return "rect-" + Bridge.getHashCode(this);
                }
            },
            HotKey: {
                get: function () {
                    return 85;
                }
            },
            DisplayName: {
                get: function () {
                    return "Rectangle";
                }
            },
            IconName: {
                get: function () {
                    return "icons8-rectangular-32";
                }
            },
            Category: {
                get: function () {
                    return Festival_Bridge.Api.Tools.CategoryName.Shape;
                }
            }
        },
        alias: [
            "ToolId", "Festival_Bridge$Api$Tools$ITool$ToolId",
            "HotKey", "Festival_Bridge$Api$Tools$ITool$HotKey",
            "DisplayName", "Festival_Bridge$Api$Tools$ITool$DisplayName",
            "IconName", "Festival_Bridge$Api$Tools$ITool$IconName",
            "Category", "Festival_Bridge$Api$Tools$ITool$Category",
            "Awake", "Festival_Bridge$Api$Tools$ITool$Awake",
            "Enable", "Festival_Bridge$Api$Tools$ITool$Enable",
            "Disable", "Festival_Bridge$Api$Tools$ITool$Disable"
        ],
        methods: {
            Awake: function () { },
            Enable: function () {
                Festival_Bridge.Api.Events.EventManager.On(Festival_Bridge.Api.Elements.PointerDownSignal, Bridge.fn.cacheBind(this, this.OnPointerDown));
                Festival_Bridge.Api.Events.EventManager.On(Festival_Bridge.Api.Elements.PointerUpSignal, Bridge.fn.cacheBind(this, this.OnPointerUp));
                Festival_Bridge.Api.Events.EventManager.On(Festival_Bridge.Api.Elements.PointerDragSignal, Bridge.fn.cacheBind(this, this.OnPointerDrag));
            },
            Disable: function () {
                Festival_Bridge.Api.Events.EventManager.Off(Festival_Bridge.Api.Elements.PointerUpSignal, Bridge.fn.cacheBind(this, this.OnPointerUp));
                Festival_Bridge.Api.Events.EventManager.Off(Festival_Bridge.Api.Elements.PointerDownSignal, Bridge.fn.cacheBind(this, this.OnPointerDown));
                Festival_Bridge.Api.Events.EventManager.Off(Festival_Bridge.Api.Elements.PointerDragSignal, Bridge.fn.cacheBind(this, this.OnPointerDrag));
                this.currentSvgRect = null;
            },
            OnPointerDown: function (ev) {
                this.currentSvgRect = (this.currentSvgRect = document.createElementNS(Festival_Bridge.Api.Tools.ToolUtils.SvgNamespace, "rect"));
                this.currentSvgRect.setAttributeNS(null, "x", System.String.format("{0}px", [Bridge.box(ev.StageX, System.Int32)]));
                this.currentSvgRect.setAttributeNS(null, "y", System.String.format("{0}px", [Bridge.box(ev.StageY, System.Int32)]));
                this.currentSvgRect.setAttributeNS(null, "width", "0");
                this.currentSvgRect.setAttributeNS(null, "height", "0");
                this.currentSvgRect.setAttributeNS(null, "stroke", "black");
                this.currentSvgRect.setAttributeNS(null, "fill", "transparent");
                this.currentSvgRect.style.pointerEvents = "none";
                Festival_Bridge.Api.EditorComponents.Stage.Current.Canvas.CurrentLayer.Element.append($(this.currentSvgRect));
            },
            OnPointerUp: function (ev) {
                if (this.currentSvgRect != null) {
                    if (ev.MouseButton !== ev.ActualButton) {
                        this.currentSvgRect.remove();
                        this.currentSvgRect = null;
                    } else {
                        this.currentSvgRect = null;
                    }
                }
            },
            OnPointerDrag: function (ev) {
                this.currentSvgRect.setAttributeNS(null, "x", System.String.format("{0}px", [Bridge.box(ev.AnchoredStageX, System.Int32)]));
                this.currentSvgRect.setAttributeNS(null, "y", System.String.format("{0}px", [Bridge.box(ev.AnchoredStageY, System.Int32)]));
                this.currentSvgRect.setAttributeNS(null, "width", System.String.format("{0}px", [Bridge.box(ev.Width, System.Int32)]));
                this.currentSvgRect.setAttributeNS(null, "height", System.String.format("{0}px", [Bridge.box(ev.Height, System.Int32)]));
            }
        }
    });

    Bridge.define("Festival_Bridge.Api.Elements.PointerDragSignal", {
        inherits: [Festival_Bridge.Api.Elements.PointerAnchoredSignalBase],
        fields: {
            MouseButton: 0
        }
    });

    Bridge.define("Festival_Bridge.Api.Elements.PointerUpSignal", {
        inherits: [Festival_Bridge.Api.Elements.PointerAnchoredSignalBase],
        fields: {
            MouseButton: 0
        }
    });

    /** @namespace Festival_Bridge.ManagedActions */

    /**
     * A managed action for the rectangle drawing tool.
     *
     * @class Festival_Bridge.ManagedActions.CreateSvgRect
     * @augments Festival_Bridge.ManagedActions.Base.CreateSvgElement$1
     */
    Bridge.define("Festival_Bridge.ManagedActions.CreateSvgRect", {
        inherits: [Festival_Bridge.ManagedActions.Base.CreateSvgElement$1(SVGRectElement)],
        props: {
            DisplayName: {
                get: function () {
                    return "Create Rectangle";
                }
            },
            SvgTagName: {
                get: function () {
                    return "rect";
                }
            }
        },
        alias: ["DisplayName", "Festival_Bridge$Api$ManagedActions$IManagedAction$DisplayName"],
        ctors: {
            ctor: function (parent) {
                this.$initialize();
                Festival_Bridge.ManagedActions.Base.CreateSvgElement$1(SVGRectElement).ctor.call(this, parent);
            }
        },
        methods: {
            RefreshElement: function (element) {
                Festival_Bridge.ManagedActions.Base.CreateSvgElement$1(SVGRectElement).prototype.RefreshElement.call(this, element);
                var el = Untype(element);
                el.setAttributeNS(null, "x", System.String.format("{0}px", [Bridge.box(this.StartX, System.Int32)]));
                el.setAttributeNS(null, "y", System.String.format("{0}px", [Bridge.box(this.StartY, System.Int32)]));
                el.setAttributeNS(null, "width", System.String.format("{0}px", [Bridge.box(this.Width, System.Int32)]));
                el.setAttributeNS(null, "height", System.String.format("{0}px", [Bridge.box(this.Height, System.Int32)]));
            }
        }
    });
});

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJGZXN0aXZhbF9CcmlkZ2UuanMiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbIkFwaS9FZGl0b3JDb21wb25lbnRzL0xheWVycy9BYnN0cmFjdExheWVyLmNzIiwiQXBpL0VkaXRvckNvbXBvbmVudHMvU3RhZ2UuY3MiLCJBcGkvRWRpdG9yQ29tcG9uZW50cy9TdGFnZUNhbnZhcy5jcyIsIkFwaS9FbGVtZW50cy9FbGVtZW50c01hbmFnZXIuY3MiLCJBcGkvRWxlbWVudHMvTWFpbk1lbnVNYW5hZ2VyLmNzIiwiQXBpL0VsZW1lbnRzL1BvaW50ZXJFdmVudHNfSXRlbXMuY3MiLCJBcGkvRWxlbWVudHMvUG9pbnRlclV0aWxzLmNzIiwiQXBpL0VsZW1lbnRzL1ZpZXdwb3J0UG9pbnRlckV2ZW50cy5jcyIsIkFwaS9FdmVudHMvRXZlbnRNYW5hZ2VyLmNzIiwiQXBpL0luaXRBbGwuY3MiLCJBcGkvTWFuYWdlZEFjdGlvbnMvQWN0aW9uVGltZWxpbmUuY3MiLCJBcGkvUG9wdXBzL1BvcHVwTWFuYWdlci5jcyIsIkFwaS9UYWJzL1BhZ2VNYW5hZ2VyLmNzIiwiQXBpL1RhYnMvVGFiTWFuYWdlci5jcyIsIkFwaS9Ub29sYmFycy9Ub29sYmFyLmNzIiwiQXBpL1Rvb2xiYXJzL1Rvb2xiYXJzTWFuYWdlci5jcyIsIkFwaS9Ub29scy9Ub29sTWFuYWdlci5jcyIsIkFwaS9Ub29scy9Ub29sVXRpbHMuY3MiLCJBcGkvVHlwZXMvUkdCQS5jcyIsIkFwcC5jcyIsIkRlYnVnZ2Vycy9EZWJ1Z1BvaW50ZXJUb0NhbnZhcy5jcyIsIkxhbmd1YWdlcy9MYW5nLmNzIiwiVG9vbHMvSW5kZXguY3MiLCJBcGkvRWRpdG9yQ29tcG9uZW50cy9MYXllcnMvU3ZnTGF5ZXIuY3MiLCJNYW5hZ2VkQWN0aW9ucy9CYXNlL0NyZWF0ZVN2Z0VsZW1lbnQuY3MiLCJUb29scy9EZWJ1Z1JlY3RUb29sLmNzIiwiVG9vbHMvUmVjdFRvb2wgLmNzIiwiVG9vbHMvUmVjdFRvb2xfT2xkTWFudWFsTW9kZS5jcyIsIk1hbmFnZWRBY3Rpb25zL0NyZWF0ZVN2Z1JlY3QuY3MiXSwKICAibmFtZXMiOiBbIiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzRCQWEyQkEsUUFBb0JBOztnQkFFbkNBLG9CQUFlQTtnQkFDZkEsWUFBT0E7Ozs7a0NBR2NBO2dCQUVyQkEsT0FBT0EsRUFBV0EsNEJBQTRCQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7bUNDVHBCQSxJQUFJQSwyQ0FBTUE7Ozs7Ozs7Ozs7Ozs0QkFPM0JBOztnQkFFVEEsZUFBVUE7Z0JBQ1ZBLEVBQWFBLEFBQWVBOzs7OztnQkFLNUJBLElBQUlBLGdCQUFXQTtvQkFDWEEsZUFBVUE7OztnQkFFZEEsOEJBQXlCQTtnQkFDekJBLGNBQVNBLElBQUlBLGlEQUFZQTtnQkFDekJBOzs7Z0JBS0FBLFNBQWlCQSxZQUFhQTs7Z0JBRTlCQSxlQUFlQTtnQkFDZkEsZUFBZUE7O2dCQUVmQSxnQkFBZ0JBO2dCQUNoQkEsZ0JBQWdCQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztvQkN6QnBCQSxPQUFPQSxZQUFVQTs7Ozs7b0JBTWpCQSxPQUFPQTs7Ozs7OzhCQVoyQkEsS0FBSUE7OzRCQWVuQkE7O2dCQUVmQSxlQUFVQTtnQkFDVkEsOEJBQXlCQTtnQkFDekJBOzs7O3NDQUcyQkE7Z0JBRTNCQSxZQUFpQkEsSUFBSUEscURBQVNBLE1BQU1BO2dCQUNwQ0EsZ0JBQVdBO2dCQUNYQSxvQkFBZUE7Z0JBQ2ZBLE9BQU9BOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozt3QkN6QlhBLE9BQU9BOzs7Ozt3QkFNUEEsT0FBT0E7Ozs7O3dCQU1QQSxPQUFPQTs7Ozs7d0JBTVBBLE9BQU9BOzs7Ozt3QkFNUEEsT0FBT0E7Ozs7O3dCQU1QQSxPQUFPQTs7Ozs7d0JBTVBBLE9BQU9BOzs7Ozt3QkFNUEEsT0FBT0E7Ozs7O3dCQU1QQSxPQUFPQTs7Ozs7d0JBTVBBLE9BQU9BOzs7Ozt3QkFNUEEsT0FBT0E7Ozs7O3dCQU1QQSxPQUFPQTs7Ozs7d0JBTVBBLE9B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OUJBLG1DQUE4QkE7Z0JBQzlCQSxtQ0FBOEJBO2dCQUM5QkE7Z0JBQ0FBLHNGQUFpREEsRUFBV0E7O21DQUd2Q0E7Z0JBRXJCQSxJQUFJQSx1QkFBa0JBO29CQUVsQkEsSUFBSUEsbUJBQWtCQTt3QkFFbEJBO3dCQUNBQSxzQkFBaUJBOzt3QkFJakJBLHNCQUFpQkE7Ozs7cUNBS0ZBO2dCQUV2QkEsbUNBQThCQSxXQUFXQSwrQkFBc0JBO2dCQUMvREEsbUNBQThCQSxXQUFXQSwrQkFBc0JBO2dCQUMvREEsbUNBQThCQSxlQUFlQSwrQkFBc0JBO2dCQUNuRUEsbUNBQThCQSxnQkFBZ0JBLCtCQUFzQkE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O29CQ25GeEVBOzs7OztvQkFNQUE7Ozs7Ozs0QkFYcUJBOzt1R0FBc0JBOzs7O3NDQWNQQTtnQkFFaENBLDJHQUFvQkE7Z0JBQ3BCQSxTQUFTQSxPQUEyQ0E7Z0JBQ3BEQSxrQkFBa0JBLFdBQVdBLCtCQUFzQkE7Z0JBQ25EQSxrQkFBa0JBLFdBQVdBLCtCQUFzQkE7Z0JBQ25EQSxrQkFBa0JBLGVBQWVBLCtCQUFzQkE7Z0JBQ3ZEQSxrQkFBa0JBLGdCQUFnQkEsK0JBQXNCQSIsCiAgInNvdXJjZXNDb250ZW50IjogWyJ1c2luZyBCcmlkZ2UualF1ZXJ5MjtcclxuXHJcbm5hbWVzcGFjZSBGZXN0aXZhbF9CcmlkZ2UuQXBpLkVkaXRvckNvbXBvbmVudHMuTGF5ZXJzXHJcbntcclxuICAgIC8vLyA8c3VtbWFyeT5cclxuICAgIC8vLyBSZXByZXNlbnRzIGEgZHJhd2luZyBsYXllciB0aGF0IG11c3QgYmUgZXh0ZW5kZWQuXHJcbiAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgYWJzdHJhY3QgY2xhc3MgQ3VzdG9tTGF5ZXJcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgU3RhZ2VDYW52YXMgUGFyZW50Q2FudmFzO1xyXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgTmFtZTtcclxuICAgICAgICBwdWJsaWMgalF1ZXJ5IEVsZW1lbnQ7XHJcblxyXG4gICAgICAgIHB1YmxpYyBDdXN0b21MYXllcihTdGFnZUNhbnZhcyBjYW52YXMsIHN0cmluZyBuYW1lKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgUGFyZW50Q2FudmFzID0gY2FudmFzO1xyXG4gICAgICAgICAgICBOYW1lID0gbmFtZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBqUXVlcnkgQWRkRWxlbWVudChzdHJpbmcgZWxlbWVudE9yU2VsZWN0b3IpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IGpRdWVyeShlbGVtZW50T3JTZWxlY3RvcikuQXBwZW5kVG8oRWxlbWVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwidXNpbmcgQnJpZGdlLkh0bWw1O1xyXG51c2luZyBCcmlkZ2UualF1ZXJ5MjtcclxudXNpbmcgRmVzdGl2YWxfQnJpZGdlLkFwaS5FbGVtZW50cztcclxuXHJcbm5hbWVzcGFjZSBGZXN0aXZhbF9CcmlkZ2UuQXBpLkVkaXRvckNvbXBvbmVudHNcclxue1xyXG4gICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgLy8vIENvbnRyb2xzIHRoZSBTdGFnZSwgYW4gZWxlbWVudCB0aGF0IGhhcyBhIENhbnZhcyBhbmQgdGhlIHNwYWNlIHdoZXJlXHJcbiAgICAvLy8gdGhlIGludGVyYWN0aW9ucyBvZiB0aGUgcG9pbnRlciBmb2N1c2VkIG9uIHRoZSBkcmF3aW5nIG9jY3VyLlxyXG4gICAgLy8vIDwvc3VtbWFyeT5cclxuICAgIGNsYXNzIFN0YWdlXHJcbiAgICB7XHJcbiAgICAgICAgc3RhdGljIHB1YmxpYyBTdGFnZSBDdXJyZW50ID0gbmV3IFN0YWdlKG51bGwpO1xyXG5cclxuICAgICAgICBzdGF0aWMgcHVibGljIHZvaWQgSW5pdCgpIHsgfVxyXG5cclxuICAgICAgICBwdWJsaWMgalF1ZXJ5IEVsZW1lbnQ7XHJcbiAgICAgICAgcHVibGljIFN0YWdlQ2FudmFzIENhbnZhcztcclxuXHJcbiAgICAgICAgcHVibGljIFN0YWdlKGpRdWVyeSBlbGVtZW50KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgRWxlbWVudCA9IGVsZW1lbnQ7XHJcbiAgICAgICAgICAgIGpRdWVyeS5SZWFkeSgoU3lzdGVtLkFjdGlvbilJbml0aWFsaXplU3RhZ2UpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIEluaXRpYWxpemVTdGFnZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoRWxlbWVudCA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgRWxlbWVudCA9IG5ldyBqUXVlcnkoXCIuc3RhZ2VcIikuRmlyc3QoKTtcclxuXHJcbiAgICAgICAgICAgIEVsZW1lbnQuRGF0YShcImluc3RhbmNlXCIsIHRoaXMpO1xyXG4gICAgICAgICAgICBDYW52YXMgPSBuZXcgU3RhZ2VDYW52YXMoRWxlbWVudC5DaGlsZHJlbihcIi5jYW52YXNcIikpO1xyXG4gICAgICAgICAgICBDZW50ZXJTY3JvbGwoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIENlbnRlclNjcm9sbCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBIVE1MRWxlbWVudCBlbCA9IChIVE1MRWxlbWVudClFbGVtZW50c01hbmFnZXIuVmlld3BvcnQuR2V0KDApO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgZWwuU2Nyb2xsVG9wID0gZWwuU2Nyb2xsSGVpZ2h0O1xyXG4gICAgICAgICAgICBlbC5TY3JvbGxUb3AgPSBlbC5TY3JvbGxUb3AgLyAyO1xyXG5cclxuICAgICAgICAgICAgZWwuU2Nyb2xsTGVmdCA9IGVsLlNjcm9sbFdpZHRoO1xyXG4gICAgICAgICAgICBlbC5TY3JvbGxMZWZ0ID0gZWwuU2Nyb2xsTGVmdCAvIDI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIEJyaWRnZS5qUXVlcnkyO1xyXG51c2luZyBGZXN0aXZhbF9CcmlkZ2UuQXBpLkVkaXRvckNvbXBvbmVudHMuTGF5ZXJzO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxuXHJcbm5hbWVzcGFjZSBGZXN0aXZhbF9CcmlkZ2UuQXBpLkVkaXRvckNvbXBvbmVudHNcclxue1xyXG4gICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgLy8vIENvbnRyb2xzIHRoZSBDYW52YXMgd2hlcmUgdGhlIGxheWVycyBvZiB0aGUgZHJhd2luZyB3aWxsIGJlIGJ1aWx0LlxyXG4gICAgLy8vIDwvc3VtbWFyeT5cclxuICAgIGNsYXNzIFN0YWdlQ2FudmFzXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIGpRdWVyeSBFbGVtZW50O1xyXG4gICAgICAgIHB1YmxpYyBMaXN0PEN1c3RvbUxheWVyPiBMYXllcnMgPSBuZXcgTGlzdDxDdXN0b21MYXllcj4oKTtcclxuICAgICAgICBwdWJsaWMgQ3VzdG9tTGF5ZXIgQ3VycmVudExheWVyO1xyXG5wdWJsaWMgU3ZnTGF5ZXIgQ3VycmVudExheWVyQXNTVkdcclxue1xyXG4gICAgZ2V0XHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIChTdmdMYXllcilDdXJyZW50TGF5ZXI7XHJcbiAgICB9XHJcbn1wdWJsaWMgU3RhZ2UgUGFyZW50U3RhZ2Vcclxue1xyXG4gICAgZ2V0XHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIEVsZW1lbnQuUGFyZW50KFwiLnN0YWdlXCIpLkRhdGEoXCJpbnN0YW5jZVwiKSBhcyBTdGFnZTtcclxuICAgIH1cclxufVxyXG4gICAgICAgIHB1YmxpYyBTdGFnZUNhbnZhcyhqUXVlcnkgZWxlbWVudClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEVsZW1lbnQgPSBlbGVtZW50O1xyXG4gICAgICAgICAgICBFbGVtZW50LkRhdGEoXCJpbnN0YW5jZVwiLCB0aGlzKTtcclxuICAgICAgICAgICAgQ3JlYXRlU3ZnTGF5ZXIoXCJEZWZhdWx0XCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFN2Z0xheWVyIENyZWF0ZVN2Z0xheWVyKHN0cmluZyBuYW1lKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgU3ZnTGF5ZXIgbGF5ZXIgPSBuZXcgU3ZnTGF5ZXIodGhpcywgbmFtZSk7XHJcbiAgICAgICAgICAgIExheWVycy5BZGQobGF5ZXIpO1xyXG4gICAgICAgICAgICBDdXJyZW50TGF5ZXIgPSBsYXllcjtcclxuICAgICAgICAgICAgcmV0dXJuIGxheWVyO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsInVzaW5nIEJyaWRnZS5qUXVlcnkyO1xyXG5cclxubmFtZXNwYWNlIEZlc3RpdmFsX0JyaWRnZS5BcGkuRWxlbWVudHNcclxue1xyXG4gICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgLy8vIENvbnRhaW5zIHJlZmVyZW5jZXMgdG8gdGhlIG1haW4gZWxlbWVudHMgb2YgdGhlIGFwcGxpY2F0aW9uLlxyXG4gICAgLy8vIDwvc3VtbWFyeT5cclxuICAgIGNsYXNzIEVsZW1lbnRzTWFuYWdlclxyXG4gICAge1xyXG4gICAgICAgIHN0YXRpYyBwcm90ZWN0ZWQgRWxlbWVudHNNYW5hZ2VyIEluc3RhbmNlID0gbmV3IEVsZW1lbnRzTWFuYWdlcigpO1xyXG5zdGF0aWMgcHVibGljIGpRdWVyeSBCb2R5XHJcbntcclxuICAgIGdldFxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBJbnN0YW5jZS5ib2R5O1xyXG4gICAgfVxyXG59c3RhdGljIHB1YmxpYyBqUXVlcnkgTWFpbk1lbnVcclxue1xyXG4gICAgZ2V0XHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIEluc3RhbmNlLm1haW5NZW51O1xyXG4gICAgfVxyXG59c3RhdGljIHB1YmxpYyBqUXVlcnkgVmlld3BvcnRcclxue1xyXG4gICAgZ2V0XHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIEluc3RhbmNlLnZpZXdwb3J0O1xyXG4gICAgfVxyXG59c3RhdGljIHB1YmxpYyBqUXVlcnkgVmlld3BvcnRTdGFnZVxyXG57XHJcbiAgICBnZXRcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gSW5zdGFuY2Uudmlld3BvcnRTdGFnZTtcclxuICAgIH1cclxufXN0YXRpYyBwdWJsaWMgalF1ZXJ5IFZpZXdwb3J0Q2FudmFzXHJcbntcclxuICAgIGdldFxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBJbnN0YW5jZS52aWV3cG9ydENhbnZhcztcclxuICAgIH1cclxufXN0YXRpYyBwdWJsaWMgalF1ZXJ5IFZpZXdwb3J0UG9pbnRlckFyZWFcclxue1xyXG4gICAgZ2V0XHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIEluc3RhbmNlLnZpZXdwb3J0UG9pbnRlckFyZWE7XHJcbiAgICB9XHJcbn1zdGF0aWMgcHVibGljIGpRdWVyeSBNYWluRWRpdG9yQXJlYVxyXG57XHJcbiAgICBnZXRcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gSW5zdGFuY2UubWFpbkVkaXRvckFyZWE7XHJcbiAgICB9XHJcbn1zdGF0aWMgcHVibGljIGpRdWVyeSBGYXJMZWZ0QXJlYVxyXG57XHJcbiAgICBnZXRcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gSW5zdGFuY2UuZmFyTGVmdEFyZWE7XHJcbiAgICB9XHJcbn1zdGF0aWMgcHVibGljIGpRdWVyeSBMZWZ0QXJlYVxyXG57XHJcbiAgICBnZXRcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gSW5zdGFuY2UubGVmdEFyZWE7XHJcbiAgICB9XHJcbn1zdGF0aWMgcHVibGljIGpRdWVyeSBSaWdodEFyZWFcclxue1xyXG4gICAgZ2V0XHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIEluc3RhbmNlLnJpZ2h0QXJlYTtcclxuICAgIH1cclxufXN0YXRpYyBwdWJsaWMgalF1ZXJ5IEZhclJpZ2h0QXJlYVxyXG57XHJcbiAgICBnZXRcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gSW5zdGFuY2UuZmFyUmlnaHRBcmVhO1xyXG4gICAgfVxyXG59c3RhdGljIHB1YmxpYyBqUXVlcnkgQm90dG9tQXJlYVxyXG57XHJcbiAgICBnZXRcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gSW5zdGFuY2UuYm90dG9tQXJlYTtcclxuICAgIH1cclxufXN0YXRpYyBwdWJsaWMgalF1ZXJ5IFBvcHVwc0FyZWFcclxue1xyXG4gICAgZ2V0XHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIEluc3RhbmNlLnBvcHVwc0FyZWE7XHJcbiAgICB9XHJcbn1cclxuICAgICAgICBwcml2YXRlIGpRdWVyeSBib2R5O1xyXG4gICAgICAgIHByaXZhdGUgalF1ZXJ5IG1haW5NZW51O1xyXG4gICAgICAgIHByaXZhdGUgalF1ZXJ5IHZpZXdwb3J0O1xyXG4gICAgICAgIHByaXZhdGUgalF1ZXJ5IHZpZXdwb3J0U3RhZ2U7XHJcbiAgICAgICAgcHJpdmF0ZSBqUXVlcnkgdmlld3BvcnRDYW52YXM7XHJcbiAgICAgICAgcHJpdmF0ZSBqUXVlcnkgdmlld3BvcnRQb2ludGVyQXJlYTtcclxuICAgICAgICBwcml2YXRlIGpRdWVyeSBtYWluRWRpdG9yQXJlYTtcclxuICAgICAgICBwcml2YXRlIGpRdWVyeSBmYXJMZWZ0QXJlYTtcclxuICAgICAgICBwcml2YXRlIGpRdWVyeSBsZWZ0QXJlYTtcclxuICAgICAgICBwcml2YXRlIGpRdWVyeSByaWdodEFyZWE7XHJcbiAgICAgICAgcHJpdmF0ZSBqUXVlcnkgZmFyUmlnaHRBcmVhO1xyXG4gICAgICAgIHByaXZhdGUgalF1ZXJ5IGJvdHRvbUFyZWE7XHJcbiAgICAgICAgcHJpdmF0ZSBqUXVlcnkgcG9wdXBzQXJlYTtcclxuXHJcbiAgICAgICAgc3RhdGljIHB1YmxpYyB2b2lkIEluaXQoKSB7IH1cclxuXHJcbiAgICAgICAgcHVibGljIEVsZW1lbnRzTWFuYWdlcigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBqUXVlcnkuUmVhZHkoKFN5c3RlbS5BY3Rpb24pSW5pdGlhbGl6ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgSW5pdGlhbGl6ZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBib2R5ID0gbmV3IGpRdWVyeShcImJvZHlcIik7XHJcbiAgICAgICAgICAgIG1haW5NZW51ID0gbmV3IGpRdWVyeShcImJvZHkgPiBtYWluID4gaGVhZGVyXCIpO1xyXG4gICAgICAgICAgICB2aWV3cG9ydCA9IG5ldyBqUXVlcnkoXCJib2R5ID4gbWFpbiA+IC52aWV3cG9ydFwiKTtcclxuICAgICAgICAgICAgdmlld3BvcnRTdGFnZSA9IG5ldyBqUXVlcnkoXCJib2R5ID4gbWFpbiA+IC52aWV3cG9ydCA+IC5zdGFnZVwiKTtcclxuICAgICAgICAgICAgdmlld3BvcnRDYW52YXMgPSBuZXcgalF1ZXJ5KFwiYm9keSA+IG1haW4gPiAudmlld3BvcnQgPiAuc3RhZ2UgPiAuY2FudmFzXCIpO1xyXG4gICAgICAgICAgICB2aWV3cG9ydFBvaW50ZXJBcmVhID0gbmV3IGpRdWVyeShcImJvZHkgPiBtYWluID4gLnZpZXdwb3J0IC5lZGl0b3ItbW91c2VcIik7XHJcbiAgICAgICAgICAgIGZhckxlZnRBcmVhID0gbmV3IGpRdWVyeShcImJvZHkgPiBtYWluID4gLmRvY2tzaXRlLWZhcmxlZnRcIik7XHJcbiAgICAgICAgICAgIGxlZnRBcmVhID0gbmV3IGpRdWVyeShcImJvZHkgPiBtYWluID4gLmRvY2tzaXRlLWxlZnRcIik7XHJcbiAgICAgICAgICAgIHJpZ2h0QXJlYSA9IG5ldyBqUXVlcnkoXCJib2R5ID4gbWFpbiA+IC5kb2Nrc2l0ZS1yaWdodFwiKTtcclxuICAgICAgICAgICAgZmFyUmlnaHRBcmVhID0gbmV3IGpRdWVyeShcImJvZHkgPiBtYWluID4gLmRvY2tzaXRlLWZhcnJpZ2h0XCIpO1xyXG4gICAgICAgICAgICBib3R0b21BcmVhID0gbmV3IGpRdWVyeShcImJvZHkgPiBtYWluID4gLmRvY2tzaXRlLWJvdHRvbVwiKTtcclxuICAgICAgICAgICAgbWFpbkVkaXRvckFyZWEgPSBuZXcgalF1ZXJ5KFwiYm9keSA+IG1haW4gPiAuZG9ja3NpdGUtbWFpblwiKTtcclxuICAgICAgICAgICAgcG9wdXBzQXJlYSA9IG5ldyBqUXVlcnkoXCJib2R5ID4gLnBvcHVwc1wiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgQnJpZGdlLkh0bWw1O1xyXG51c2luZyBCcmlkZ2UualF1ZXJ5MjtcclxudXNpbmcgRmVzdGl2YWxfQnJpZGdlLkFwaS5Qb3B1cHM7XHJcbnVzaW5nIFN5c3RlbTtcclxuXHJcbm5hbWVzcGFjZSBGZXN0aXZhbF9CcmlkZ2UuQXBpLkVsZW1lbnRzXHJcbntcclxuICAgIC8vLyA8c3VtbWFyeT5cclxuICAgIC8vLyBNYW5hZ2VzIHRoZSBtYWluIG1lbnUuXHJcbiAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgY2xhc3MgTWFpbk1lbnVNYW5hZ2VyXHJcbiAgICB7XHJcbiAgICAgICAgc3RhdGljIHB1YmxpYyBNYWluTWVudU1hbmFnZXIgSW5zdGFuY2UgPSBuZXcgTWFpbk1lbnVNYW5hZ2VyKCk7XHJcblxyXG4gICAgICAgIHN0YXRpYyBwdWJsaWMgdm9pZCBJbml0KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGpRdWVyeS5SZWFkeSgoQWN0aW9uKSgoKSA9PlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBFbGVtZW50c01hbmFnZXIuTWFpbk1lbnUuT24oXCJjbGlja1wiLCBcImFbZGF0YS1wb3B1cF1cIiwgbmV3IEFjdGlvbjxNb3VzZUV2ZW50PihPbkNsaWNrTWFpbk1lbnUpKTtcclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RhdGljIHByaXZhdGUgdm9pZCBPbkNsaWNrTWFpbk1lbnUoTW91c2VFdmVudCBlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZS5QcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBqUXVlcnkgdGFyZ2V0ID0gbmV3IGpRdWVyeShlLlRhcmdldCk7XHJcbiAgICAgICAgICAgIHN0cmluZyBwb3B1cE5hbWUgPSB0YXJnZXQuQXR0cihcImRhdGEtcG9wdXBcIik7XHJcbiAgICAgICAgICAgIFBvcHVwTWFuYWdlci5JbnN0YW5jZS5PcGVuUG9wdXBCZWxvdyhwb3B1cE5hbWUsIChIVE1MRWxlbWVudCl0YXJnZXQuR2V0KDApKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwibmFtZXNwYWNlIEZlc3RpdmFsX0JyaWRnZS5BcGkuRWxlbWVudHNcclxue1xyXG4gICAgaW50ZXJuYWwgYWJzdHJhY3QgY2xhc3MgUG9pbnRlclNpZ25hbEJhc2VcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgaW50IFZpZXdwb3J0WDtcclxuICAgICAgICBwdWJsaWMgaW50IFZpZXdwb3J0WTtcclxuICAgICAgICBwdWJsaWMgYm9vbCBDdHJsS2V5O1xyXG4gICAgICAgIHB1YmxpYyBib29sIFNoaWZ0S2V5O1xyXG4gICAgICAgIHB1YmxpYyBib29sIEFsdEtleTtcclxucHVibGljIGludCBTdGFnZVhcclxue1xyXG4gICAgZ2V0XHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIFBvaW50ZXJVdGlscy5TdGFnZVhUb0NhbnZhc1goVmlld3BvcnRYKTtcclxuICAgIH1cclxufXB1YmxpYyBpbnQgU3RhZ2VZXHJcbntcclxuICAgIGdldFxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBQb2ludGVyVXRpbHMuU3RhZ2VZVG9DYW52YXNZKFZpZXdwb3J0WSk7XHJcbiAgICB9XHJcbn0gICAgfVxyXG5cclxuICAgIGludGVybmFsIGFic3RyYWN0IGNsYXNzIFBvaW50ZXJBbmNob3JlZFNpZ25hbEJhc2UgOiBQb2ludGVyU2lnbmFsQmFzZVxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBpbnQgQW5jaG9yZWRYO1xyXG4gICAgICAgIHB1YmxpYyBpbnQgQW5jaG9yZWRZO1xyXG5wdWJsaWMgaW50IFdpZHRoXHJcbntcclxuICAgIGdldFxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBWaWV3cG9ydFggLSBBbmNob3JlZFg7XHJcbiAgICB9XHJcbn1wdWJsaWMgaW50IEhlaWdodFxyXG57XHJcbiAgICBnZXRcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gVmlld3BvcnRZIC0gQW5jaG9yZWRZO1xyXG4gICAgfVxyXG59XHJcbiAgICAgICAgcHVibGljIGludCBPcmlnaW5hbFg7XHJcbiAgICAgICAgcHVibGljIGludCBPcmlnaW5hbFk7XHJcbiAgICAgICAgcHVibGljIGludCBBY3R1YWxYO1xyXG4gICAgICAgIHB1YmxpYyBpbnQgQWN0dWFsWTtcclxuICAgICAgICBwdWJsaWMgaW50IEFjdHVhbEJ1dHRvbjtcclxucHVibGljIGludCBBbmNob3JlZFN0YWdlWFxyXG57XHJcbiAgICBnZXRcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gUG9pbnRlclV0aWxzLlN0YWdlWFRvQ2FudmFzWChBbmNob3JlZFgpO1xyXG4gICAgfVxyXG59cHVibGljIGludCBBbmNob3JlZFN0YWdlWVxyXG57XHJcbiAgICBnZXRcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gUG9pbnRlclV0aWxzLlN0YWdlWVRvQ2FudmFzWShBbmNob3JlZFkpO1xyXG4gICAgfVxyXG59ICAgIH1cclxuXHJcbiAgICBjbGFzcyBQb2ludGVyRG93blNpZ25hbCA6IFBvaW50ZXJTaWduYWxCYXNlXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIGludCBNb3VzZUJ1dHRvbjtcclxuICAgIH1cclxuXHJcbiAgICBjbGFzcyBQb2ludGVyVXBTaWduYWwgOiBQb2ludGVyQW5jaG9yZWRTaWduYWxCYXNlXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIGludCBNb3VzZUJ1dHRvbjtcclxuICAgIH1cclxuXHJcbiAgICBjbGFzcyBQb2ludGVyRHJhZ1NpZ25hbCA6IFBvaW50ZXJBbmNob3JlZFNpZ25hbEJhc2VcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgaW50IE1vdXNlQnV0dG9uO1xyXG4gICAgfVxyXG5cclxuICAgIGNsYXNzIFBvaW50ZXJIb3ZlclNpZ25hbCA6IFBvaW50ZXJTaWduYWxCYXNlXHJcbiAgICB7XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgQnJpZGdlLmpRdWVyeTI7XHJcblxyXG5uYW1lc3BhY2UgRmVzdGl2YWxfQnJpZGdlLkFwaS5FbGVtZW50c1xyXG57XHJcbiAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAvLy8gVXRpbGl0aWVzIHRvIG1hbmFnZSB0aGUgcG9pbnRlci5cclxuICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICBzdGF0aWMgY2xhc3MgUG9pbnRlclV0aWxzXHJcbiAgICB7XHJcbiAgICAgICAgc3RhdGljIHB1YmxpYyB2b2lkIFBhZ2VYWVRvU3RhZ2VYWShpbnQgcGFnZVgsIGludCBwYWdlWSwgb3V0IGludCBzdGFnZVgsIG91dCBpbnQgc3RhZ2VZKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgUG9pbnQgb2Zmc2V0ID0gRWxlbWVudHNNYW5hZ2VyLlZpZXdwb3J0U3RhZ2UuT2Zmc2V0KCk7XHJcbiAgICAgICAgICAgIHN0YWdlWCA9IHBhZ2VYIC0gb2Zmc2V0LkxlZnQgKyBFbGVtZW50c01hbmFnZXIuVmlld3BvcnRTdGFnZS5TY3JvbGxMZWZ0KCk7XHJcbiAgICAgICAgICAgIHN0YWdlWSA9IHBhZ2VZIC0gb2Zmc2V0LlRvcCArIEVsZW1lbnRzTWFuYWdlci5WaWV3cG9ydFN0YWdlLlNjcm9sbFRvcCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RhdGljIHB1YmxpYyB2b2lkIFBhZ2VYWVRvQ2FudmFzWFkoaW50IHBhZ2VYLCBpbnQgcGFnZVksIG91dCBpbnQgY2FudmFzWCwgb3V0IGludCBjYW52YXNZKVxyXG4gICAgICAgIHtcclxuaW50IHN0YWdlWDtcbmludCBzdGFnZVk7XG4gICAgICAgICAgICBQYWdlWFlUb1N0YWdlWFkocGFnZVgsIHBhZ2VZLCBvdXQgc3RhZ2VYLCBvdXQgc3RhZ2VZKTtcclxuICAgICAgICAgICAgU3RhZ2VYWVRvQ2FudmFzWFkoc3RhZ2VYLCBzdGFnZVksIG91dCBjYW52YXNYLCBvdXQgY2FudmFzWSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdGF0aWMgcHVibGljIHZvaWQgU3RhZ2VYWVRvQ2FudmFzWFkoaW50IHN0YWdlWCwgaW50IHN0YWdlWSwgb3V0IGludCBjYW52YXNYLCBvdXQgaW50IGNhbnZhc1kpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBQb2ludCBwb3NpdGlvbiA9IEVsZW1lbnRzTWFuYWdlci5WaWV3cG9ydENhbnZhcy5Qb3NpdGlvbigpO1xyXG4gICAgICAgICAgICBjYW52YXNYID0gc3RhZ2VYIC0gcG9zaXRpb24uTGVmdDtcclxuICAgICAgICAgICAgY2FudmFzWSA9IHN0YWdlWSAtIHBvc2l0aW9uLlRvcDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0YXRpYyBwdWJsaWMgaW50IFN0YWdlWFRvQ2FudmFzWChpbnQgc3RhZ2VYKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgUG9pbnQgcG9zaXRpb24gPSBFbGVtZW50c01hbmFnZXIuVmlld3BvcnRDYW52YXMuUG9zaXRpb24oKTtcclxuICAgICAgICAgICAgcmV0dXJuIHN0YWdlWCAtIHBvc2l0aW9uLkxlZnQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdGF0aWMgcHVibGljIGludCBTdGFnZVlUb0NhbnZhc1koaW50IHN0YWdlWSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFBvaW50IHBvc2l0aW9uID0gRWxlbWVudHNNYW5hZ2VyLlZpZXdwb3J0Q2FudmFzLlBvc2l0aW9uKCk7XHJcbiAgICAgICAgICAgIHJldHVybiBzdGFnZVkgLSBwb3NpdGlvbi5Ub3A7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIEJyaWRnZS5IdG1sNTtcclxudXNpbmcgQnJpZGdlLmpRdWVyeTI7XHJcbnVzaW5nIEZlc3RpdmFsX0JyaWRnZS5BcGkuRXZlbnRzO1xyXG5cclxubmFtZXNwYWNlIEZlc3RpdmFsX0JyaWRnZS5BcGkuRWxlbWVudHNcclxue1xyXG4gICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgLy8vIE1hbmFnZXMgcG9pbnRlciBldmVudHMgaW4gdGhlIGRyYXdpbmcgYXJlYSAoU3RhZ2UpLlxyXG4gICAgLy8vIDwvc3VtbWFyeT5cclxuICAgIGNsYXNzIFZpZXdwb3J0UG9pbnRlckV2ZW50c1xyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBkZWxlZ2F0ZSB2b2lkIE9uUG9pbnRlckV2ZW50KE1vdXNlRXZlbnQgZSk7XHJcblxyXG4gICAgICAgIHN0YXRpYyBwdWJsaWMgdm9pZCBJbml0KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGpRdWVyeS5SZWFkeSgoU3lzdGVtLkFjdGlvbikoKCkgPT5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgQXNzaWduKEVsZW1lbnRzTWFuYWdlci5WaWV3cG9ydFBvaW50ZXJBcmVhLCBcInBvaW50ZXJkb3duXCIsIChWaWV3cG9ydFBvaW50ZXJFdmVudHMuT25Qb2ludGVyRXZlbnQpUG9pbnRlckRvd24pO1xyXG4gICAgICAgICAgICAgICAgQXNzaWduKEVsZW1lbnRzTWFuYWdlci5WaWV3cG9ydFBvaW50ZXJBcmVhLCBcInBvaW50ZXJtb3ZlXCIsIChWaWV3cG9ydFBvaW50ZXJFdmVudHMuT25Qb2ludGVyRXZlbnQpUG9pbnRlck1vdmUpO1xyXG4gICAgICAgICAgICAgICAgQXNzaWduKEVsZW1lbnRzTWFuYWdlci5WaWV3cG9ydFBvaW50ZXJBcmVhLCBcInBvaW50ZXJ1cFwiLCAoVmlld3BvcnRQb2ludGVyRXZlbnRzLk9uUG9pbnRlckV2ZW50KVBvaW50ZXJVcCk7XHJcbiAgICAgICAgICAgICAgICBBc3NpZ24oRWxlbWVudHNNYW5hZ2VyLlZpZXdwb3J0UG9pbnRlckFyZWEsIFwiY29udGV4dG1lbnVcIiwgKFZpZXdwb3J0UG9pbnRlckV2ZW50cy5PblBvaW50ZXJFdmVudClQcmV2ZW50RGVmYXVsdCk7XHJcbiAgICAgICAgICAgICAgICBBc3NpZ24oRWxlbWVudHNNYW5hZ2VyLkJvZHksIFwicG9pbnRlcnVwXCIsIChWaWV3cG9ydFBvaW50ZXJFdmVudHMuT25Qb2ludGVyRXZlbnQpUG9pbnRlclVwR2xvYmFsbHkpO1xyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdGF0aWMgcHJpdmF0ZSBib29sIGlzUG9pbnRlckRvd24gPSBmYWxzZTtcclxuICAgICAgICBzdGF0aWMgcHJpdmF0ZSBpbnQgb3JpZ2luYWxDbGlja1g7XHJcbiAgICAgICAgc3RhdGljIHByaXZhdGUgaW50IG9yaWdpbmFsQ2xpY2tZO1xyXG4gICAgICAgIHN0YXRpYyBwcml2YXRlIGludCBjbGlja0J1dHRvbjtcclxuXHJcbiAgICAgICAgc3RhdGljIHZvaWQgQXNzaWduKGpRdWVyeSBlbGVtZW50LCBzdHJpbmcgZXZlbnROYW1lLCBPblBvaW50ZXJFdmVudCBwb2ludGVyRXZlbnQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBlbGVtZW50Lk9uKGV2ZW50TmFtZSwgcG9pbnRlckV2ZW50KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0YXRpYyB2b2lkIFByZXZlbnREZWZhdWx0KEV2ZW50IGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBlLlByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdGF0aWMgdm9pZCBQb2ludGVyRG93bihNb3VzZUV2ZW50IGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBlLlByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIEVsZW1lbnRzTWFuYWdlci5WaWV3cG9ydC5Gb2N1cygpO1xyXG5pbnQgeDtcbmludCB5O1xuICAgICAgICAgICAgUG9pbnRlclV0aWxzLlBhZ2VYWVRvU3RhZ2VYWShlLlBhZ2VYLCBlLlBhZ2VZLCBvdXQgeCwgb3V0IHkpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGlzUG9pbnRlckRvd24gPT0gZmFsc2UpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHBvaW50ZXJVcExvY2FsbHkgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGlzUG9pbnRlckRvd24gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgb3JpZ2luYWxDbGlja1ggPSB4O1xyXG4gICAgICAgICAgICAgICAgb3JpZ2luYWxDbGlja1kgPSB5O1xyXG4gICAgICAgICAgICAgICAgY2xpY2tCdXR0b24gPSBlLkJ1dHRvbjtcclxuICAgICAgICAgICAgICAgIEV2ZW50TWFuYWdlci5EaXNwYXRjaDxQb2ludGVyRG93blNpZ25hbD4obmV3IFBvaW50ZXJEb3duU2lnbmFsXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgQWx0S2V5ID0gZS5BbHRLZXksXHJcbiAgICAgICAgICAgICAgICAgICAgQ3RybEtleSA9IGUuQ3RybEtleSxcclxuICAgICAgICAgICAgICAgICAgICBTaGlmdEtleSA9IGUuU2hpZnRLZXksXHJcbiAgICAgICAgICAgICAgICAgICAgVmlld3BvcnRYID0gb3JpZ2luYWxDbGlja1gsXHJcbiAgICAgICAgICAgICAgICAgICAgVmlld3BvcnRZID0gb3JpZ2luYWxDbGlja1ksXHJcbiAgICAgICAgICAgICAgICAgICAgTW91c2VCdXR0b24gPSBjbGlja0J1dHRvbixcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdGF0aWMgcHJpdmF0ZSBib29sIHBvaW50ZXJVcExvY2FsbHkgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgc3RhdGljIHZvaWQgUG9pbnRlclVwKE1vdXNlRXZlbnQgZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGUuUHJldmVudERlZmF1bHQoKTtcclxuaW50IHg7XG5pbnQgeTtcbiAgICAgICAgICAgIFBvaW50ZXJVdGlscy5QYWdlWFlUb1N0YWdlWFkoZS5QYWdlWCwgZS5QYWdlWSwgb3V0IHgsIG91dCB5KTtcclxuICAgICAgICAgICAgcG9pbnRlclVwTG9jYWxseSA9IHRydWU7XHJcbiAgICAgICAgICAgIGlmIChpc1BvaW50ZXJEb3duKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBFdmVudE1hbmFnZXIuRGlzcGF0Y2g8UG9pbnRlclVwU2lnbmFsPihuZXcgUG9pbnRlclVwU2lnbmFsXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgQWx0S2V5ID0gZS5BbHRLZXksXHJcbiAgICAgICAgICAgICAgICAgICAgQ3RybEtleSA9IGUuQ3RybEtleSxcclxuICAgICAgICAgICAgICAgICAgICBTaGlmdEtleSA9IGUuU2hpZnRLZXksXHJcbiAgICAgICAgICAgICAgICAgICAgQW5jaG9yZWRYID0gb3JpZ2luYWxDbGlja1ggPCB4ID8gb3JpZ2luYWxDbGlja1ggOiB4LFxyXG4gICAgICAgICAgICAgICAgICAgIEFuY2hvcmVkWSA9IG9yaWdpbmFsQ2xpY2tZIDwgeSA/IG9yaWdpbmFsQ2xpY2tZIDogeSxcclxuICAgICAgICAgICAgICAgICAgICBWaWV3cG9ydFggPSB4ID4gb3JpZ2luYWxDbGlja1ggPyB4IDogb3JpZ2luYWxDbGlja1gsXHJcbiAgICAgICAgICAgICAgICAgICAgVmlld3BvcnRZID0geSA+IG9yaWdpbmFsQ2xpY2tZID8geSA6IG9yaWdpbmFsQ2xpY2tZLFxyXG4gICAgICAgICAgICAgICAgICAgIE1vdXNlQnV0dG9uID0gY2xpY2tCdXR0b24sXHJcbiAgICAgICAgICAgICAgICAgICAgT3JpZ2luYWxYID0gb3JpZ2luYWxDbGlja1gsXHJcbiAgICAgICAgICAgICAgICAgICAgT3JpZ2luYWxZID0gb3JpZ2luYWxDbGlja1ksXHJcbiAgICAgICAgICAgICAgICAgICAgQWN0dWFsWCA9IHgsXHJcbiAgICAgICAgICAgICAgICAgICAgQWN0dWFsWSA9IHksXHJcbiAgICAgICAgICAgICAgICAgICAgQWN0dWFsQnV0dG9uID0gZS5CdXR0b24sXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RhdGljIHZvaWQgUG9pbnRlclVwR2xvYmFsbHkoTW91c2VFdmVudCBlKVxyXG4gICAgICAgIHtcclxuaW50IHg7XG5pbnQgeTtcbiAgICAgICAgICAgIFBvaW50ZXJVdGlscy5QYWdlWFlUb1N0YWdlWFkoZS5QYWdlWCwgZS5QYWdlWSwgb3V0IHgsIG91dCB5KTtcclxuXHJcbiAgICAgICAgICAgIGlmIChpc1BvaW50ZXJEb3duICYmIHBvaW50ZXJVcExvY2FsbHkgPT0gZmFsc2UpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIEV2ZW50TWFuYWdlci5EaXNwYXRjaDxQb2ludGVyVXBTaWduYWw+KG5ldyBQb2ludGVyVXBTaWduYWxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBBbHRLZXkgPSBlLkFsdEtleSxcclxuICAgICAgICAgICAgICAgICAgICBDdHJsS2V5ID0gZS5DdHJsS2V5LFxyXG4gICAgICAgICAgICAgICAgICAgIFNoaWZ0S2V5ID0gZS5TaGlmdEtleSxcclxuICAgICAgICAgICAgICAgICAgICBBbmNob3JlZFggPSBvcmlnaW5hbENsaWNrWCA8IHggPyBvcmlnaW5hbENsaWNrWCA6IHgsXHJcbiAgICAgICAgICAgICAgICAgICAgQW5jaG9yZWRZID0gb3JpZ2luYWxDbGlja1kgPCB5ID8gb3JpZ2luYWxDbGlja1kgOiB5LFxyXG4gICAgICAgICAgICAgICAgICAgIFZpZXdwb3J0WCA9IHggPiBvcmlnaW5hbENsaWNrWCA/IHggOiBvcmlnaW5hbENsaWNrWCxcclxuICAgICAgICAgICAgICAgICAgICBWaWV3cG9ydFkgPSB5ID4gb3JpZ2luYWxDbGlja1kgPyB5IDogb3JpZ2luYWxDbGlja1ksXHJcbiAgICAgICAgICAgICAgICAgICAgTW91c2VCdXR0b24gPSBjbGlja0J1dHRvbixcclxuICAgICAgICAgICAgICAgICAgICBPcmlnaW5hbFggPSBvcmlnaW5hbENsaWNrWCxcclxuICAgICAgICAgICAgICAgICAgICBPcmlnaW5hbFkgPSBvcmlnaW5hbENsaWNrWSxcclxuICAgICAgICAgICAgICAgICAgICBBY3R1YWxYID0geCxcclxuICAgICAgICAgICAgICAgICAgICBBY3R1YWxZID0geSxcclxuICAgICAgICAgICAgICAgICAgICBBY3R1YWxCdXR0b24gPSBlLkJ1dHRvbixcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoaXNQb2ludGVyRG93bilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZS5QcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgaXNQb2ludGVyRG93biA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdGF0aWMgdm9pZCBQb2ludGVyTW92ZShNb3VzZUV2ZW50IGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBlLlByZXZlbnREZWZhdWx0KCk7XHJcbmludCB4O1xuaW50IHk7XG4gICAgICAgICAgICBQb2ludGVyVXRpbHMuUGFnZVhZVG9TdGFnZVhZKGUuUGFnZVgsIGUuUGFnZVksIG91dCB4LCBvdXQgeSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoaXNQb2ludGVyRG93bilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgRXZlbnRNYW5hZ2VyLkRpc3BhdGNoPFBvaW50ZXJEcmFnU2lnbmFsPihuZXcgUG9pbnRlckRyYWdTaWduYWxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBBbHRLZXkgPSBlLkFsdEtleSxcclxuICAgICAgICAgICAgICAgICAgICBDdHJsS2V5ID0gZS5DdHJsS2V5LFxyXG4gICAgICAgICAgICAgICAgICAgIFNoaWZ0S2V5ID0gZS5TaGlmdEtleSxcclxuICAgICAgICAgICAgICAgICAgICBBbmNob3JlZFggPSBvcmlnaW5hbENsaWNrWCA8IHggPyBvcmlnaW5hbENsaWNrWCA6IHgsXHJcbiAgICAgICAgICAgICAgICAgICAgQW5jaG9yZWRZID0gb3JpZ2luYWxDbGlja1kgPCB5ID8gb3JpZ2luYWxDbGlja1kgOiB5LFxyXG4gICAgICAgICAgICAgICAgICAgIFZpZXdwb3J0WCA9IHggPiBvcmlnaW5hbENsaWNrWCA/IHggOiBvcmlnaW5hbENsaWNrWCxcclxuICAgICAgICAgICAgICAgICAgICBWaWV3cG9ydFkgPSB5ID4gb3JpZ2luYWxDbGlja1kgPyB5IDogb3JpZ2luYWxDbGlja1ksXHJcbiAgICAgICAgICAgICAgICAgICAgTW91c2VCdXR0b24gPSBjbGlja0J1dHRvbixcclxuICAgICAgICAgICAgICAgICAgICBPcmlnaW5hbFggPSBvcmlnaW5hbENsaWNrWCxcclxuICAgICAgICAgICAgICAgICAgICBPcmlnaW5hbFkgPSBvcmlnaW5hbENsaWNrWSxcclxuICAgICAgICAgICAgICAgICAgICBBY3R1YWxYID0geCxcclxuICAgICAgICAgICAgICAgICAgICBBY3R1YWxZID0geSxcclxuICAgICAgICAgICAgICAgICAgICBBY3R1YWxCdXR0b24gPSBlLkJ1dHRvbixcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgRXZlbnRNYW5hZ2VyLkRpc3BhdGNoPFBvaW50ZXJIb3ZlclNpZ25hbD4obmV3IFBvaW50ZXJIb3ZlclNpZ25hbFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIEFsdEtleSA9IGUuQWx0S2V5LFxyXG4gICAgICAgICAgICAgICAgICAgIEN0cmxLZXkgPSBlLkN0cmxLZXksXHJcbiAgICAgICAgICAgICAgICAgICAgU2hpZnRLZXkgPSBlLlNoaWZ0S2V5LFxyXG4gICAgICAgICAgICAgICAgICAgIFZpZXdwb3J0WCA9IHgsXHJcbiAgICAgICAgICAgICAgICAgICAgVmlld3BvcnRZID0geSxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcblxyXG5uYW1lc3BhY2UgRmVzdGl2YWxfQnJpZGdlLkFwaS5FdmVudHNcclxue1xyXG4gICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgLy8vIE9iamVjdCBjYXBhYmxlIG9mIGVtaXR0aW5nIGFuZCByZWdpc3RlcmluZyBsaXN0ZW5lcnMgb2YgY3VzdG9tIGV2ZW50cy5cclxuICAgIC8vLyBMaXN0ZW5lcnMgcmVnaXN0ZXIgZm9yIGV2ZW50cyByZXByZXNlbnRlZCBieSB0aGUgdHlwZSB0aGUgb2JqZWN0IGJlaW5nXHJcbiAgICAvLy8gZGlzcGF0Y2hlZC4gVGhlc2Ugb2JqZWN0cyBhcmUgZnJvbSBjdXN0b20gY2xhc3NlcyBjb250YWluaW5nXHJcbiAgICAvLy8gaW5mb3JtYXRpb24gYWJvdXQgdGhlIGV2ZW50LlxyXG4gICAgLy8vIDwvc3VtbWFyeT5cclxuICAgIGNsYXNzIEV2ZW50TWFuYWdlclxyXG4gICAge1xyXG4gICAgICAgIHN0YXRpYyBwdWJsaWMgdm9pZCBJbml0KCkgeyB9XHJcbiAgICAgICAgc3RhdGljIHByaXZhdGUgRGljdGlvbmFyeTxUeXBlLCBMaXN0PERlbGVnYXRlPj4gZXZlbnRzID0gbmV3IERpY3Rpb25hcnk8VHlwZSwgTGlzdDxEZWxlZ2F0ZT4+KCk7XHJcblxyXG4gICAgICAgIHN0YXRpYyBwdWJsaWMgdm9pZCBPbjxUPihBY3Rpb248VD4gYWN0aW9uKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKGV2ZW50cy5Db250YWluc0tleSh0eXBlb2YoVCkpID09IGZhbHNlKVxyXG4gICAgICAgICAgICAgICAgZXZlbnRzLkFkZCh0eXBlb2YoVCksIG5ldyBMaXN0PERlbGVnYXRlPigpKTtcclxuXHJcbiAgICAgICAgICAgIGV2ZW50c1t0eXBlb2YoVCldLkFkZChhY3Rpb24pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RhdGljIHB1YmxpYyB2b2lkIE9mZjxUPihBY3Rpb248VD4gYWN0aW9uKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKGV2ZW50cy5Db250YWluc0tleSh0eXBlb2YoVCkpID09IGZhbHNlKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgaWYgKGV2ZW50c1t0eXBlb2YoVCldLlJlbW92ZShhY3Rpb24pID09IGZhbHNlKVxyXG4gICAgICAgICAgICAgICAgQnJpZGdlLlV0aWxzLkNvbnNvbGUuRXJyb3Ioc3RyaW5nLkZvcm1hdChcIkNvdWxkIG5vdCByZW1vdmUgQWN0aW9uPHswfT4gZnJvbSBldmVudFwiLHR5cGVvZihUKSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RhdGljIHB1YmxpYyB2b2lkIERpc3BhdGNoPFQ+KFQgZXZlbnREYXRhKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKGV2ZW50cy5Db250YWluc0tleSh0eXBlb2YoVCkpID09IGZhbHNlKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBldmVudHNbdHlwZW9mKFQpXS5Db3VudDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0cnlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBldmVudHNbdHlwZW9mKFQpXVtpXS5DYWxsKG51bGwsIGV2ZW50RGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjYXRjaCAoRXhjZXB0aW9uIGUpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgQnJpZGdlLlV0aWxzLkNvbnNvbGUuRXJyb3Ioc3RyaW5nLkZvcm1hdChcIk9uIGV2ZW50IHswfSwgbGlzdGVuZXIgZXhjZXB0aW9uOiB7MX1cIix0eXBlb2YoVCksZSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBFdmVudERhdGEgeyB9XHJcblxyXG4gICAgcHVibGljIGNsYXNzIEV2ZW50RGF0YTxUPiA6IEV2ZW50RGF0YSB7IH1cclxufVxyXG4iLCJ1c2luZyBGZXN0aXZhbF9CcmlkZ2UuQXBpLkVkaXRvckNvbXBvbmVudHM7XHJcbnVzaW5nIEZlc3RpdmFsX0JyaWRnZS5BcGkuRWxlbWVudHM7XHJcbnVzaW5nIEZlc3RpdmFsX0JyaWRnZS5BcGkuRXZlbnRzO1xyXG51c2luZyBGZXN0aXZhbF9CcmlkZ2UuQXBpLlRhYnM7XHJcbnVzaW5nIEZlc3RpdmFsX0JyaWRnZS5BcGkuVG9vbGJhcnM7XHJcbnVzaW5nIEZlc3RpdmFsX0JyaWRnZS5BcGkuVG9vbHM7XHJcblxyXG5uYW1lc3BhY2UgRmVzdGl2YWxfQnJpZGdlLkFwaVxyXG57XHJcbiAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAvLy8gRG8gb25lIGFjY2VzcyBmb3IgZWFjaCBzdGF0aWMgdG8gZm9yY2UgdGhlaXIgY3JlYXRpb24uIEl0IG1heSBzZWVtXHJcbiAgICAvLy8gc29tZXdoYXQgaGFja3ksIGJ1dCBtYW4sIGl0IHdvcmtlZCBzbW9vdGhseSBzbyBmYXIhXHJcbiAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgY2xhc3MgSW5pdEFsbFxyXG4gICAge1xyXG4gICAgICAgIHN0YXRpYyBwdWJsaWMgdm9pZCBJbml0aWFsaXplQWxsKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vIEFQSSBmZWF0dXJlc1xyXG4gICAgICAgICAgICBFdmVudE1hbmFnZXIuSW5pdCgpO1xyXG4gICAgICAgICAgICBFbGVtZW50c01hbmFnZXIuSW5pdCgpO1xyXG4gICAgICAgICAgICBWaWV3cG9ydFBvaW50ZXJFdmVudHMuSW5pdCgpO1xyXG4gICAgICAgICAgICBNYWluTWVudU1hbmFnZXIuSW5pdCgpO1xyXG4gICAgICAgICAgICBUb29sYmFyc01hbmFnZXIuSW5pdCgpO1xyXG4gICAgICAgICAgICBUb29sTWFuYWdlci5Jbml0KCk7XHJcbiAgICAgICAgICAgIFN0YWdlLkluaXQoKTtcclxuICAgICAgICAgICAgVGFiTWFuYWdlci5Jbml0KCk7XHJcblxyXG4gICAgICAgICAgICAvLyBFeHRlbnNpb25zXHJcbiAgICAgICAgICAgIEZlc3RpdmFsX0JyaWRnZS5Ub29scy5JbmRleC5Jbml0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIEZlc3RpdmFsX0JyaWRnZS5BcGkuRXZlbnRzO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxuXHJcbm5hbWVzcGFjZSBGZXN0aXZhbF9CcmlkZ2UuQXBpLk1hbmFnZWRBY3Rpb25zXHJcbntcclxuICAgIC8vLyA8c3VtbWFyeT5cclxuICAgIC8vLyBDbGFzcyB0byBzdG9yZSBhIHRpbWVsaW5lIG9mIG1hbmFnZWQgYWN0aW9ucy4gTWFuYWdlZCBhY3Rpb25zIGFyZVxyXG4gICAgLy8vIGNvbW1hbmRzIG9yIGFjdGlvbnMgZXhlY3V0ZWQgdG8gY29tcG9zZSB0aGUgYXBwbGljYXRpb24gZmVhdHVyZXMsXHJcbiAgICAvLy8gaW5jbHVkaW5nIGFjdGlvbnMgdG8gZHJhdyBlbGVtZW50cywgY2hhbmdlIGF0dHJpYnV0ZXMgKGNvbG9yLCBsaW5lLFxyXG4gICAgLy8vIGV0Yy4pLCBkZWxldGUgZWxlbWVudHMgYW5kIGV2ZXJ5dGhpbmcgZWxzZS4gQW4gYWR2YW50YWdlIGlzIHRoZSBhYmlsaXR5XHJcbiAgICAvLy8gdG8gdW5kbywgcmVkbyBhbmQgcmVwZWF0IGFjdGlvbnMgcmVnaXN0ZXJlZCBpbiB0aGlzIGNsYXNzLlxyXG4gICAgLy8vIDwvc3VtbWFyeT5cclxuICAgIGNsYXNzIEFjdGlvblRpbWVsaW5lXHJcbiAgICB7XHJcbiAgICAgICAgc3RhdGljIHB1YmxpYyBBY3Rpb25UaW1lbGluZSBJbnN0YW5jZSA9IG5ldyBBY3Rpb25UaW1lbGluZSgpO1xyXG5cclxuICAgICAgICBwcml2YXRlIExpc3Q8SU1hbmFnZWRBY3Rpb24+IGFjdGlvbnMgPSBuZXcgTGlzdDxJTWFuYWdlZEFjdGlvbj4oKTtcclxuXHJcbiAgICAgICAgcHVibGljIGludCBJbmRleCA9IDA7XHJcbnB1YmxpYyBJTWFuYWdlZEFjdGlvbiBUb3Bcclxue1xyXG4gICAgZ2V0XHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIGFjdGlvbnMuQ291bnQgPiAwID8gYWN0aW9uc1tJbmRleF0gOiBudWxsO1xyXG4gICAgfVxyXG59cHVibGljIGJvb2wgQ2FuUmVwZWF0QWN0aW9uXHJcbntcclxuICAgIGdldFxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBhY3Rpb25zLkNvdW50ID4gMCA/IGFjdGlvbnNbSW5kZXhdIGlzIElSZXBlYXRhYmxlTWFuYWdlZEFjdGlvbiA6IGZhbHNlO1xyXG4gICAgfVxyXG59XHJcbiAgICAgICAgcHVibGljIHZvaWQgRG8oSU1hbmFnZWRBY3Rpb24gYWN0aW9uLCBib29sIHByZXZlbnREb0NhbGwgPSBmYWxzZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIENsYW1wQWN0aW9uc0FmdGVyKEluZGV4KTtcclxuXHJcbiAgICAgICAgICAgIGFjdGlvbnMuQWRkKGFjdGlvbik7XHJcbiAgICAgICAgICAgIEluZGV4ID0gYWN0aW9ucy5Db3VudCAtIDE7XHJcblxyXG4gICAgICAgICAgICBpZiAocHJldmVudERvQ2FsbCA9PSBmYWxzZSlcclxuICAgICAgICAgICAgICAgIGFjdGlvbi5EbygpO1xyXG5cclxuICAgICAgICAgICAgRXZlbnRNYW5hZ2VyLkRpc3BhdGNoPE9uUmVnaXN0ZXJNYW5hZ2VkQWN0aW9uRXZlbnQ+KG5ldyBPblJlZ2lzdGVyTWFuYWdlZEFjdGlvbkV2ZW50KCkgeyBNYW5hZ2VkQWN0aW9uID0gYWN0aW9uIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgVW5kbygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoYWN0aW9ucy5Db3VudCA9PSAwKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgRXZlbnRNYW5hZ2VyLkRpc3BhdGNoPE9uQmVmb3JlVW5kb01hbmFnZWRBY3Rpb25FdmVudD4obmV3IE9uQmVmb3JlVW5kb01hbmFnZWRBY3Rpb25FdmVudCgpIHsgTWFuYWdlZEFjdGlvbiA9IGFjdGlvbnNbSW5kZXhdIH0pO1xyXG4gICAgICAgICAgICBpZiAoYWN0aW9uc1tJbmRleF0uVW5kbygpKVxyXG4gICAgICAgICAgICAgICAgSW5kZXgtLTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFJlZG8oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKEluZGV4IDwgYWN0aW9ucy5Db3VudCAtIDEpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIEluZGV4Kys7XHJcbiAgICAgICAgICAgICAgICBhY3Rpb25zW0luZGV4XS5EbygpO1xyXG4gICAgICAgICAgICAgICAgRXZlbnRNYW5hZ2VyLkRpc3BhdGNoPE9uQWZ0ZXJSZWRvTWFuYWdlZEFjdGlvbkV2ZW50PihuZXcgT25BZnRlclJlZG9NYW5hZ2VkQWN0aW9uRXZlbnQoKSB7IE1hbmFnZWRBY3Rpb24gPSBhY3Rpb25zW0luZGV4XSB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgUmVwZWF0KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChhY3Rpb25zLkNvdW50ID09IDApXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbklSZXBlYXRhYmxlTWFuYWdlZEFjdGlvbiByZXBlYXRhYmxlO1xyXG4gICAgICAgICAgICBpZiAoKHJlcGVhdGFibGUgPSBhY3Rpb25zW0luZGV4XSBhcyBJUmVwZWF0YWJsZU1hbmFnZWRBY3Rpb24pICE9IG51bGwpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIENsYW1wQWN0aW9uc0FmdGVyKEluZGV4KTtcclxuICAgICAgICAgICAgICAgIElNYW5hZ2VkQWN0aW9uIGNsb25lID0gcmVwZWF0YWJsZS5DbG9uZSgpO1xyXG4gICAgICAgICAgICAgICAgRG8oY2xvbmUpO1xyXG4gICAgICAgICAgICAgICAgRXZlbnRNYW5hZ2VyLkRpc3BhdGNoPE9uUmVwZWF0TWFuYWdlZEFjdGlvbkV2ZW50PihuZXcgT25SZXBlYXRNYW5hZ2VkQWN0aW9uRXZlbnQoKSB7IFByb3RvdHlwZUFjdGlvbiA9IHJlcGVhdGFibGUsIENsb25lZEFjdGlvbiA9IGNsb25lIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgQ2xhbXBBY3Rpb25zQWZ0ZXIoaW50IGluZGV4KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IGFjdGlvbnMuQ291bnQgLSAxOyBpID4gaW5kZXg7IGktLSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgYWN0aW9ucy5SZW1vdmVBdChpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBCcmlkZ2UuSHRtbDU7XHJcbnVzaW5nIEJyaWRnZS5qUXVlcnkyO1xyXG51c2luZyBGZXN0aXZhbF9CcmlkZ2UuQXBpLkVsZW1lbnRzO1xyXG51c2luZyBTeXN0ZW07XHJcblxyXG5uYW1lc3BhY2UgRmVzdGl2YWxfQnJpZGdlLkFwaS5Qb3B1cHNcclxue1xyXG4gICAgY2xhc3MgUG9wdXBNYW5hZ2VyXHJcbiAgICB7XHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBEb2VzIG5vdCBuZWVkIHRvIGJlIGluaXRpYXRlZCBhdCBzdGFydCwgb25seSBhdCB1c2UuXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICBzdGF0aWMgcHVibGljIFBvcHVwTWFuYWdlciBJbnN0YW5jZSA9IG5ldyBQb3B1cE1hbmFnZXIoKTtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBIVE1MRWxlbWVudCBvdmVybGF5O1xyXG5cclxuICAgICAgICBwdWJsaWMgUG9wdXBNYW5hZ2VyKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGpRdWVyeS5SZWFkeSgoQWN0aW9uKSgoKSA9PlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBvdmVybGF5ID0gKEhUTUxFbGVtZW50KUVsZW1lbnRzTWFuYWdlci5Qb3B1cHNBcmVhLkNoaWxkcmVuKFwiLm92ZXJsYXlcIikuR2V0KDApO1xyXG4gICAgICAgICAgICAgICAgb3ZlcmxheS5BZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIChBY3Rpb248RXZlbnQ+KU9uQ2xpY2tPdmVybGF5KTtcclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIEhUTUxEaXZFbGVtZW50IENyZWF0ZUN1c3RvbVBvcHVwKHN0cmluZyBuYW1lKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgRWxlbWVudCBlbCA9IGpRdWVyeS5QYXJzZUhUTUwoc3RyaW5nLkZvcm1hdChcIjxkaXYgY2xhc3M9J3BvcHVwJyBkYXRhLXBvcHVwPSd7MH0nPjwvZGl2PlwiLG5hbWUpKVswXTtcclxuICAgICAgICAgICAgRWxlbWVudHNNYW5hZ2VyLlBvcHVwc0FyZWEuUHJlcGVuZChlbCk7XHJcbiAgICAgICAgICAgIHJldHVybiAoSFRNTERpdkVsZW1lbnQpZWw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgSFRNTERpdkVsZW1lbnQgQ3JlYXRlQmFzaWNQb3B1cChzdHJpbmcgbmFtZSwgc3RyaW5nW10gbGlzdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN0cmluZ1tdIGl0ZW1zID0gQXJyYXkuQ29udmVydEFsbDxzdHJpbmcsc3RyaW5nPihsaXN0LCAoQ29udmVydGVyPHN0cmluZyxzdHJpbmc+KShpdGVtID0+XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChpdGVtID09IFwiXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN0cmluZy5Gb3JtYXQoXCI8aHI+XCIpO1xyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzdHJpbmcuRm9ybWF0KFwiPGEgaHJlZj0nJz57MH08L2E+XCIsaXRlbSk7XHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgRWxlbWVudCBlbCA9IGpRdWVyeS5QYXJzZUhUTUwoc3RyaW5nLkZvcm1hdChcIjxkaXYgY2xhc3M9J3BvcHVwIGJhc2ljJyBkYXRhLXBvcHVwPSd7MH0nPnsxfTwvZGl2PlwiLG5hbWUsc3RyaW5nLkpvaW4oXCJcXG5cIiwgaXRlbXMpKSlbMF07XHJcbiAgICAgICAgICAgIEVsZW1lbnRzTWFuYWdlci5Qb3B1cHNBcmVhLlByZXBlbmQoZWwpO1xyXG4gICAgICAgICAgICByZXR1cm4gKEhUTUxEaXZFbGVtZW50KWVsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIEhUTUxEaXZFbGVtZW50IEdldFBvcHVwKHN0cmluZyBuYW1lKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgalF1ZXJ5IHBvcHVwID0gRWxlbWVudHNNYW5hZ2VyLlBvcHVwc0FyZWEuRmluZChzdHJpbmcuRm9ybWF0KFwiW2RhdGEtcG9wdXA9XFxcInswfVxcXCJdXCIsbmFtZSkpO1xyXG4gICAgICAgICAgICByZXR1cm4gcG9wdXAuR2V0KDApIGFzIEhUTUxEaXZFbGVtZW50O1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBwdWJsaWMgdm9pZCBDbG9zZVBvcHVwcygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBFbGVtZW50c01hbmFnZXIuUG9wdXBzQXJlYS5GaW5kKFwiLnBvcHVwXCIpLlJlbW92ZUNsYXNzKFwib3BlblwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIE9wZW5Qb3B1cEF0KHN0cmluZyBuYW1lLCBpbnQgeCwgaW50IHkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBDbG9zZVBvcHVwcygpO1xyXG4gICAgICAgICAgICBIVE1MRWxlbWVudCBlbCA9IEdldFBvcHVwKG5hbWUpO1xyXG4gICAgICAgICAgICBpZiAoZWwgIT0gbnVsbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZWwuU3R5bGUuTGVmdCA9IHN0cmluZy5Gb3JtYXQoXCJ7MH1weFwiLHgpO1xyXG4gICAgICAgICAgICAgICAgZWwuU3R5bGUuVG9wID0gc3RyaW5nLkZvcm1hdChcInswfXB4XCIseSk7XHJcbiAgICAgICAgICAgICAgICBlbC5DbGFzc0xpc3QuQWRkKFwib3BlblwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgT3BlblBvcHVwQmVsb3coc3RyaW5nIG5hbWUsIEhUTUxFbGVtZW50IGVsZW1lbnQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBDbG9zZVBvcHVwcygpO1xyXG4gICAgICAgICAgICBPcGVuUG9wdXBBdChuYW1lLCBlbGVtZW50Lk9mZnNldExlZnQsIGVsZW1lbnQuT2Zmc2V0VG9wICsgZWxlbWVudC5PZmZzZXRIZWlnaHQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgT3BlblBvcHVwQmVsb3coc3RyaW5nIG5hbWUsIGpRdWVyeSBlbGVtZW50KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQ2xvc2VQb3B1cHMoKTtcclxuICAgICAgICAgICAgT3BlblBvcHVwQmVsb3cobmFtZSwgKEhUTUxFbGVtZW50KWVsZW1lbnQuR2V0KDApKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBPbkNsaWNrT3ZlcmxheShFdmVudCBldilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIENvbnNvbGUuV3JpdGVMaW5lKFwiQ2xpY2sgb3ZlcmxheVwiKTtcclxuICAgICAgICAgICAgZXYuUHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgQ2xvc2VQb3B1cHMoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgQnJpZGdlLmpRdWVyeTI7XHJcbnVzaW5nIEJyaWRnZS5VdGlscztcclxuXHJcbm5hbWVzcGFjZSBGZXN0aXZhbF9CcmlkZ2UuQXBpLlRhYnNcclxue1xyXG4gICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgLy8vIE1hbmFnZXMgYSBwYWdlIGluIHRoZSB0YWJzIG9mIHByb3BlcnR5IGFyZWFzLiBFYWNoIHBhZ2UgY2FuIGJlIGRvY2tlZFxyXG4gICAgLy8vIHRvIGEgdGFiICg8c2VlIGNyZWY9XCJUYWJNYW5hZ2VyXCIvPikgYW5kIGNvbnRhaW4gY3VzdG9tIFVJLlxyXG4gICAgLy8vIDwvc3VtbWFyeT5cclxuICAgIGNsYXNzIFBhZ2VNYW5hZ2VyXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIGpRdWVyeSBFbGVtZW50O1xyXG5cclxuICAgICAgICBwdWJsaWMgUGFnZU1hbmFnZXIoalF1ZXJ5IHBhZ2UpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBFbGVtZW50ID0gcGFnZTtcclxuXHJcbiAgICAgICAgICAgIGlmIChwYWdlLkhhc0NsYXNzKFwicGFnZVwiKSA9PSBmYWxzZSB8fCBwYWdlLkF0dHIoXCJkYXRhLXBhZ2VpZFwiKSA9PSBcIlwiKVxyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFN5c3RlbS5FeGNlcHRpb24oc3RyaW5nLkZvcm1hdChcIkdpdmVuIGVsZW1lbnQgaXMgbm90IGFuIGFjdHVhbCBwYWdlXCIpKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChwYWdlLkxlbmd0aCA+IDEpXHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgU3lzdGVtLkV4Y2VwdGlvbihzdHJpbmcuRm9ybWF0KFwiVG9vIG1hbnkgcGFnZXMgc2VsZWN0ZWQgYXQgb25jZSwgaXMgcGFnZWlkIHJlcGVhdGVkIGFjcm9zcyBwYWdlcz9cIikpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGpRdWVyeSBHZXRDdXJyZW50VGFiKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBFbGVtZW50LlBhcmVudChcIi50YWJbZGF0YS10YWJpZF1cIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBEb2NrVG8oalF1ZXJ5IHRhYilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFRhYk1hbmFnZXIuSW5zdGFuY2UuUmVmcmVzaFRhYkhlYWRlcih0YWIpO1xyXG4gICAgICAgICAgICB0YWIuQXBwZW5kKEVsZW1lbnQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRG9ja1RvKHN0cmluZyB0YWJJZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIERvY2tUbyhuZXcgalF1ZXJ5KHN0cmluZy5Gb3JtYXQoXCIudGFiW2RhdGEtdGFiaWQ9J3swfSddXCIsdGFiSWQpKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBTaG93KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFRhYk1hbmFnZXIuSW5zdGFuY2UuU2hvd1RhYihHZXRDdXJyZW50VGFiKCksIEVsZW1lbnQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBCcmlkZ2UuSHRtbDU7XHJcbnVzaW5nIEJyaWRnZS5qUXVlcnkyO1xyXG51c2luZyBGZXN0aXZhbF9CcmlkZ2UuQXBpLkVsZW1lbnRzO1xyXG51c2luZyBTeXN0ZW07XHJcblxyXG5uYW1lc3BhY2UgRmVzdGl2YWxfQnJpZGdlLkFwaS5UYWJzXHJcbntcclxuICAgIC8vLyA8c3VtbWFyeT5cclxuICAgIC8vLyBNYW5hZ2VzIHRhYnMgb2YgcHJvcGVydHkgd2luZG93cyBwcmVzZW50IGluIHRoZSBzaWRlIGRvY2thYmxlIHBhbmVscy5cclxuICAgIC8vLyBFYWNoIHRhYiBpcyBhIHBhbmVsIHdpdGggYSBoZWFkZXIgYW5kIG1hbnkgcGFnZXMuXHJcbiAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgY2xhc3MgVGFiTWFuYWdlclxyXG4gICAge1xyXG4gICAgICAgIHN0YXRpYyBwdWJsaWMgVGFiTWFuYWdlciBJbnN0YW5jZSA9IG5ldyBUYWJNYW5hZ2VyKCk7XHJcblxyXG4gICAgICAgIHN0YXRpYyBwdWJsaWMgdm9pZCBJbml0KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGpRdWVyeS5SZWFkeSgoQWN0aW9uKSgoKSA9PlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBJbnN0YW5jZS5Nb3VudChcInJpZ2h0XCIsIEVsZW1lbnRzTWFuYWdlci5SaWdodEFyZWEpO1xyXG4gICAgICAgICAgICAgICAgSW5zdGFuY2UuTW91bnQoXCJib3R0b21cIiwgRWxlbWVudHNNYW5hZ2VyLkJvdHRvbUFyZWEpO1xyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgalF1ZXJ5IEdldFRhYkVsZW1lbnQoc3RyaW5nIHRhYklkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBqUXVlcnkoc3RyaW5nLkZvcm1hdChcIi50YWJbZGF0YS10YWJpZD0nezB9J11cIix0YWJJZCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFBhZ2VNYW5hZ2VyIEdldFBhZ2Uoc3RyaW5nIHRhYklkLCBzdHJpbmcgcGFnZUlkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQYWdlTWFuYWdlcihuZXcgalF1ZXJ5KHN0cmluZy5Gb3JtYXQoXCIudGFiW2RhdGEtdGFiaWQ9J3swfSddID4gLnBhZ2VbZGF0YS1wYWdlaWQ9J3sxfSddXCIsdGFiSWQscGFnZUlkKSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFBhZ2VNYW5hZ2VyIEdldFBhZ2Uoc3RyaW5nIHBhZ2VJZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgUGFnZU1hbmFnZXIobmV3IGpRdWVyeShzdHJpbmcuRm9ybWF0KFwiLnBhZ2VbZGF0YS1wYWdlaWQ9J3swfSddXCIscGFnZUlkKSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFBhZ2VNYW5hZ2VyIENyZWF0ZVBhZ2Uoc3RyaW5nIHRhYklkLCBzdHJpbmcgcGFnZUlkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgalF1ZXJ5IHRhYiA9IEdldFRhYkVsZW1lbnQodGFiSWQpO1xyXG4gICAgICAgICAgICBQYWdlTWFuYWdlciBwYWdlID0gbmV3IFBhZ2VNYW5hZ2VyKHRhYi5BcHBlbmQoc3RyaW5nLkZvcm1hdChcIjxkaXYgY2xhc3M9J3RhYicgZGF0YS10YWJpZD0nezB9Jz48L2Rpdj5cIixwYWdlSWQpKSk7XHJcbiAgICAgICAgICAgIHBhZ2UuRG9ja1RvKHRhYik7XHJcbiAgICAgICAgICAgIHJldHVybiBwYWdlO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERlbGV0ZVBhZ2Uoc3RyaW5nIHBhZ2VJZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFBhZ2VNYW5hZ2VyIHBhZ2UgPSBHZXRQYWdlKHBhZ2VJZCk7XHJcbiAgICAgICAgICAgIGpRdWVyeSB0YWIgPSBwYWdlLkdldEN1cnJlbnRUYWIoKTtcclxuICAgICAgICAgICAgcGFnZS5FbGVtZW50LlJlbW92ZSgpO1xyXG4gICAgICAgICAgICBSZWZyZXNoVGFiSGVhZGVyKHRhYik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBEZWxldGVQYWdlKHN0cmluZyB0YWJJZCwgc3RyaW5nIHBhZ2VJZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFBhZ2VNYW5hZ2VyIHBhZ2UgPSBHZXRQYWdlKHRhYklkLCBwYWdlSWQpO1xyXG4gICAgICAgICAgICBqUXVlcnkgdGFiID0gcGFnZS5HZXRDdXJyZW50VGFiKCk7XHJcbiAgICAgICAgICAgIHBhZ2UuRWxlbWVudC5SZW1vdmUoKTtcclxuICAgICAgICAgICAgUmVmcmVzaFRhYkhlYWRlcih0YWIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgTW91bnQoc3RyaW5nIHRhYklkLCBqUXVlcnkgZG9ja3NpdGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBqUXVlcnkgdGFiID0gZG9ja3NpdGUuQ2hpbGRyZW4oc3RyaW5nLkZvcm1hdChcIi50YWJbZGF0YS10YWJpZD0nezB9J11cIix0YWJJZCkpO1xyXG4gICAgICAgICAgICBpZiAodGFiLkxlbmd0aCA9PSAwKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0YWIgPSBkb2Nrc2l0ZS5BcHBlbmQoc3RyaW5nLkZvcm1hdChcIjxkaXYgY2xhc3M9J3RhYicgZGF0YS10YWJpZD0nezB9Jz48aGVhZGVyPjwvaGVhZGVyPjwvZGl2PlwiLHRhYklkKSk7XHJcbiAgICAgICAgICAgICAgICB0YWIuT24oXCJjbGlja1wiLCBcImhlYWRlciA+IGFcIiwgbmV3IEFjdGlvbjxNb3VzZUV2ZW50PihPbkNsaWNrVGFiSGVhZGVyKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBSZWZyZXNoVGFiSGVhZGVyKHRhYi5GaXJzdCgpKTtcclxuICAgICAgICAgICAgICAgIHRhYi5PZmYoXCJjbGlja1wiLCBcImhlYWRlciA+IGFcIik7XHJcbiAgICAgICAgICAgICAgICB0YWIuT24oXCJjbGlja1wiLCBcImhlYWRlciA+IGFcIiwgbmV3IEFjdGlvbjxNb3VzZUV2ZW50PihPbkNsaWNrVGFiSGVhZGVyKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFJlZnJlc2hUYWJIZWFkZXIoalF1ZXJ5IHRhYkVsZW1lbnQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBqUXVlcnkgcGFnZXMgPSB0YWJFbGVtZW50LkNoaWxkcmVuKFwiLnBhZ2VcIik7XHJcbiAgICAgICAgICAgIGpRdWVyeSBoZWFkZXIgPSB0YWJFbGVtZW50LkNoaWxkcmVuKFwiaGVhZGVyXCIpO1xyXG4gICAgICAgICAgICBoZWFkZXIuUmVtb3ZlKFwiYVwiKTtcclxuICAgICAgICAgICAgcGFnZXMuRWFjaCgoQWN0aW9uPGludCxFbGVtZW50PikoKHBpZCwgcGFnZSkgPT5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIGpwYWdlID0gbmV3IGpRdWVyeShwYWdlKTtcclxuICAgICAgICAgICAgICAgIGhlYWRlci5BcHBlbmQoc3RyaW5nLkZvcm1hdChcIjxhIGhyZWY9JycgZGF0YS1wYWdlaWQ9J3swfSc+ezF9PC9hPlwiLGpwYWdlLkF0dHIoXCJkYXRhLXBhZ2VpZFwiKSxqcGFnZS5BdHRyKFwiZGF0YS1wYWdlLXRpdGxlXCIpKSk7XHJcbiAgICAgICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgICAgIGpRdWVyeSBhY3RpdmUgPSB0YWJFbGVtZW50LkNoaWxkcmVuKFwiLnBhZ2UuYWN0aXZlXCIpO1xyXG4gICAgICAgICAgICBpZiAoYWN0aXZlLkxlbmd0aCA9PSAwKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBhY3RpdmUgPSBwYWdlcy5GaXJzdCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFNob3dUYWIodGFiRWxlbWVudCwgYWN0aXZlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFNob3dUYWIoalF1ZXJ5IHRhYiwgalF1ZXJ5IHBhZ2UpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBDbG9zZVRhYnModGFiKTtcclxuICAgICAgICAgICAgcGFnZS5BZGRDbGFzcyhcImFjdGl2ZVwiKTtcclxuICAgICAgICAgICAgdGFiLkNoaWxkcmVuKFwiaGVhZGVyXCIpLkNoaWxkcmVuKHN0cmluZy5Gb3JtYXQoXCJhW2RhdGEtcGFnZWlkPSd7MH0nXVwiLHBhZ2UuQXR0cihcImRhdGEtcGFnZWlkXCIpKSkuQWRkQ2xhc3MoXCJhY3RpdmVcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBDbG9zZVRhYnMoalF1ZXJ5IHRhYilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRhYi5DaGlsZHJlbihcImhlYWRlclwiKS5DaGlsZHJlbihcIi5hY3RpdmVcIikuUmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIik7XHJcbiAgICAgICAgICAgIHRhYi5DaGlsZHJlbihcIi5hY3RpdmVcIikuUmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgT25DbGlja1RhYkhlYWRlcihNb3VzZUV2ZW50IGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBlLlByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIEdldFBhZ2UobmV3IGpRdWVyeShlLlRhcmdldCkuQXR0cihcImRhdGEtcGFnZWlkXCIpKS5TaG93KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIEJyaWRnZS5IdG1sNTtcclxudXNpbmcgQnJpZGdlLmpRdWVyeTI7XHJcbnVzaW5nIEZlc3RpdmFsX0JyaWRnZS5BcGkuVG9vbHM7XHJcbnVzaW5nIFN5c3RlbTtcclxuXHJcbm5hbWVzcGFjZSBGZXN0aXZhbF9CcmlkZ2UuQXBpLlRvb2xiYXJzXHJcbntcclxuICAgIC8vLyA8c3VtbWFyeT5cclxuICAgIC8vLyBBIHRvb2xiYXIgZWxlbWVudCBtb3VudGVkIGJ5IHRoZSA8c2VlIGNyZWY9XCJUb29sYmFyc01hbmFnZXJcIi8+LiBJdFxyXG4gICAgLy8vIHJlZmVyZW5jZXMgYW4gSFRNTCBlbGVtZW50IHdpdGggdGhlIGJ1dHRvbnMgYW5kIG90aGVyIGVsZW1lbnRzLlxyXG4gICAgLy8vIDwvc3VtbWFyeT5cclxuICAgIGNsYXNzIFRvb2xiYXJcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgalF1ZXJ5IEVsZW1lbnQ7XHJcblxyXG4gICAgICAgIHB1YmxpYyBUb29sYmFyKGpRdWVyeSBlbGVtZW50KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgRWxlbWVudCA9IGVsZW1lbnQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgalF1ZXJ5IEZpbmRFbGVtZW50KHN0cmluZyBzZWxlY3RvcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBFbGVtZW50LkZpbmQoc2VsZWN0b3IpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGpRdWVyeSBBZGRCdXR0b24oc3RyaW5nIGhpbnQsIHN0cmluZyBiYWNrZ3JvdW5kSW1hZ2UsIEFjdGlvbjxNb3VzZUV2ZW50PiBvbkNsaWNrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgalF1ZXJ5IGJ1dHRvbiA9IG5ldyBqUXVlcnkoalF1ZXJ5LlBhcnNlSFRNTChzdHJpbmcuRm9ybWF0KFwiPGEgaHJlZj0nJyBjbGFzcz0ndG9vbGJhci1idXR0b24nIHRpdGxlPSd7MH0nPjwvYT5cIixoaW50KSkpO1xyXG4gICAgICAgICAgICBFbGVtZW50LkFwcGVuZChidXR0b24pO1xyXG4gICAgICAgICAgICAoKEhUTUxFbGVtZW50KWJ1dHRvbi5HZXQoMCkpLlN0eWxlLkJhY2tncm91bmRJbWFnZSA9IGJhY2tncm91bmRJbWFnZTtcclxuICAgICAgICAgICAgYnV0dG9uLk9uKFwiY2xpY2tcIiwgb25DbGljayk7XHJcbiAgICAgICAgICAgIHJldHVybiBidXR0b247XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBBZGRTZXBhcmF0b3IoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgRWxlbWVudC5BcHBlbmQoXCI8aHI+XCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGpRdWVyeSBBZGRUb29sQm94QnV0dG9uKElUb29sIHRvb2wpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBqUXVlcnkgYnV0dG9uID0gVG9vbGJhcnNNYW5hZ2VyLkluc3RhbmNlLkdldFRvb2xCb3goKS5BZGRCdXR0b24oc3RyaW5nLkZvcm1hdChcInswfSAoezF9KVwiLHRvb2wuRGlzcGxheU5hbWUsdG9vbC5Ib3RLZXkpLCBzdHJpbmcuRm9ybWF0KFwidXJsKHBpY3R1cmVzL3Rvb2xzL3swfS5wbmcpXCIsdG9vbC5JY29uTmFtZSksIChBY3Rpb248TW91c2VFdmVudD4pKGUgPT5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZS5QcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgVG9vbE1hbmFnZXIuSW5zdGFuY2UuU2VsZWN0KHRvb2wpO1xyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgIGJ1dHRvbi5BdHRyKFwiZGF0YS10b29saWRcIiwgdG9vbC5Ub29sSWQpO1xyXG4gICAgICAgICAgICByZXR1cm4gYnV0dG9uO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsInVzaW5nIEJyaWRnZS5qUXVlcnkyO1xyXG51c2luZyBGZXN0aXZhbF9CcmlkZ2UuQXBpLkVsZW1lbnRzO1xyXG5cclxubmFtZXNwYWNlIEZlc3RpdmFsX0JyaWRnZS5BcGkuVG9vbGJhcnNcclxue1xyXG4gICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgLy8vIE1hbmFnZXMgYWxsIHRoZSB0b29sYmFycywgaW5jbHVkaW5nIGhvcml6b250YWwgYW5kIHZlcnRpY2FsIG9uZXMuXHJcbiAgICAvLy8gVmVydGljYWwgdG9vbGJhcnMgYXJlIG1vc3RseSB1c2VkIGZvciB0aGUgdG9vbGJhciB3aXRoIHRoZSBkcmF3aW5nXHJcbiAgICAvLy8gdG9vbHMuIFRoZSB0b29sYmFycyB0cnkgdG8gYmUgZmxleGlibGUgYW5kIGFkYXB0IGl0cyBjaGlsZHJlbiBlbGVtZW50c1xyXG4gICAgLy8vIGZvciBob3Jpem9udGFsIGFuZCB2ZXJ0aWNhbCBsYXlvdXRzLlxyXG4gICAgLy8vIDwvc3VtbWFyeT5cclxuICAgIGNsYXNzIFRvb2xiYXJzTWFuYWdlclxyXG4gICAge1xyXG4gICAgICAgIHN0YXRpYyBwdWJsaWMgVG9vbGJhcnNNYW5hZ2VyIEluc3RhbmNlID0gbmV3IFRvb2xiYXJzTWFuYWdlcigpO1xyXG5cclxuICAgICAgICBzdGF0aWMgcHVibGljIHZvaWQgSW5pdCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBqUXVlcnkuUmVhZHkoKFN5c3RlbS5BY3Rpb24pKCgpID0+XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIEluc3RhbmNlLk1vdW50KFwidG9vbHNcIiwgRWxlbWVudHNNYW5hZ2VyLkxlZnRBcmVhKTtcclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgTW91bnQoc3RyaW5nIHRvb2xiYXJJZCwgalF1ZXJ5IGVsZW1lbnQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBlbGVtZW50LkFwcGVuZChzdHJpbmcuRm9ybWF0KFwiPGRpdiBjbGFzcz0ndG9vbGJhcicgZGF0YS10b29sYmFyaWQ9J3swfSc+PC9kaXY+XCIsdG9vbGJhcklkKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgVG9vbGJhciBHZXRUb29sYmFyKHN0cmluZyB0b29sYmFySWQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFRvb2xiYXIobmV3IGpRdWVyeShzdHJpbmcuRm9ybWF0KFwiLnRvb2xiYXJbZGF0YS10b29sYmFyaWQ9J3swfSddXCIsdG9vbGJhcklkKSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFRvb2xiYXIgR2V0VG9vbEJveCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gR2V0VG9vbGJhcihcInRvb2xzXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBGZXN0aXZhbF9CcmlkZ2UuQXBpLlRvb2xiYXJzO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxuXHJcbm5hbWVzcGFjZSBGZXN0aXZhbF9CcmlkZ2UuQXBpLlRvb2xzXHJcbntcclxuICAgIC8vLyA8c3VtbWFyeT5cclxuICAgIC8vLyBNYW5hZ2VzIHRoZSBkcmF3aW5nIHRvb2xzLlxyXG4gICAgLy8vIDwvc3VtbWFyeT5cclxuICAgIGNsYXNzIFRvb2xNYW5hZ2VyXHJcbiAgICB7XHJcbiAgICAgICAgc3RhdGljIHB1YmxpYyB2b2lkIEluaXQoKSB7IH1cclxuICAgICAgICBzdGF0aWMgcHVibGljIFRvb2xNYW5hZ2VyIEluc3RhbmNlID0gbmV3IFRvb2xNYW5hZ2VyKCk7XHJcblxyXG4gICAgICAgIHB1YmxpYyBJVG9vbCBDdXJyZW50ID0gbnVsbDtcclxuXHJcbiAgICAgICAgTGlzdDxJVG9vbD4gdG9vbHMgPSBuZXcgTGlzdDxJVG9vbD4oKTtcclxuICAgICAgICBEaWN0aW9uYXJ5PGNoYXIsIExpc3Q8SVRvb2w+PiB0b29sc0hvdEtleXMgPSBuZXcgRGljdGlvbmFyeTxjaGFyLCBMaXN0PElUb29sPj4oKTtcclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgUmVnaXN0ZXIoSVRvb2wgdG9vbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmICh0b29sc0hvdEtleXMuQ29udGFpbnNLZXkodG9vbC5Ib3RLZXkpID09IGZhbHNlKVxyXG4gICAgICAgICAgICAgICAgdG9vbHNIb3RLZXlzLkFkZCh0b29sLkhvdEtleSwgbmV3IExpc3Q8SVRvb2w+KCkpO1xyXG5cclxuICAgICAgICAgICAgdG9vbHNIb3RLZXlzW3Rvb2wuSG90S2V5XS5BZGQodG9vbCk7XHJcbiAgICAgICAgICAgIHRvb2xzLkFkZCh0b29sKTtcclxuICAgICAgICAgICAgVG9vbGJhcnNNYW5hZ2VyLkluc3RhbmNlLkdldFRvb2xCb3goKS5BZGRUb29sQm94QnV0dG9uKHRvb2wpO1xyXG4gICAgICAgICAgICB0b29sLkF3YWtlKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoQ3VycmVudCA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgU2VsZWN0KHRvb2wpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgU2VsZWN0KElUb29sIHRvb2wpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoQ3VycmVudCAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgVG9vbGJhcnNNYW5hZ2VyLkluc3RhbmNlLkdldFRvb2xCb3goKS5GaW5kRWxlbWVudChzdHJpbmcuRm9ybWF0KFwiW2RhdGEtdG9vbGlkXVwiKSkuUmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIik7XHJcblxyXG4gICAgICAgICAgICBDdXJyZW50IT1udWxsP2dsb2JhbDo6QnJpZGdlLlNjcmlwdC5Gcm9tTGFtYmRhKCgpPT5DdXJyZW50LkRpc2FibGUoKSk6bnVsbDtcclxuICAgICAgICAgICAgQ3VycmVudCA9IHRvb2w7XHJcbiAgICAgICAgICAgIEN1cnJlbnQuRW5hYmxlKCk7XHJcbiAgICAgICAgICAgIFRvb2xiYXJzTWFuYWdlci5JbnN0YW5jZS5HZXRUb29sQm94KCkuRmluZEVsZW1lbnQoc3RyaW5nLkZvcm1hdChcIltkYXRhLXRvb2xpZD0nezB9J11cIix0b29sLlRvb2xJZCkpLkFkZENsYXNzKFwiYWN0aXZlXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGJvb2wgU2VsZWN0QnlIb3RrZXkoY2hhciBob3RrZXkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBMaXN0PElUb29sPiBsaXN0ID0gU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWMuQ29sbGVjdGlvbkV4dGVuc2lvbnMuR2V0VmFsdWVPckRlZmF1bHQ8Y2hhcixMaXN0PElUb29sPj4odG9vbHNIb3RLZXlzLGhvdGtleSwgbnVsbCk7XHJcbiAgICAgICAgICAgIGlmIChsaXN0ID09IG51bGwgfHwgbGlzdC5Db3VudCA9PSAwKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgaW50IGluZGV4ID0gbGlzdC5JbmRleE9mKEN1cnJlbnQpO1xyXG4gICAgICAgICAgICBpZiAoaW5kZXggPCAwIHx8IGluZGV4ID09IGxpc3QuQ291bnQgLSAxKVxyXG4gICAgICAgICAgICAgICAgU2VsZWN0KGxpc3RbMF0pO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICBTZWxlY3QobGlzdFtpbmRleCArIDFdKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZW51bSBDYXRlZ29yeU5hbWVcclxuICAgIHtcclxuICAgICAgICBOb0NhdGVnb3J5LFxyXG4gICAgICAgIFNoYXBlLFxyXG4gICAgfVxyXG5cclxuICAgIC8vLyA8c3VtbWFyeT5cclxuICAgIC8vLyBEZXNjcmliZXMgdGhlIGludGVyZmFjZSBvZiBhIGRyYXdpbmcgdG9vbC5cclxuICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICBpbnRlcmZhY2UgSVRvb2xcclxuICAgIHtcclxuICAgICAgICBzdHJpbmcgVG9vbElkIHsgZ2V0OyBwcml2YXRlIHNldDsgfVxyXG4gICAgICAgIGNoYXIgSG90S2V5IHsgZ2V0OyBwcml2YXRlIHNldDsgfVxyXG4gICAgICAgIENhdGVnb3J5TmFtZSBDYXRlZ29yeSB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cclxuICAgICAgICBzdHJpbmcgRGlzcGxheU5hbWUgeyBnZXQ7IHByaXZhdGUgc2V0OyB9XHJcbiAgICAgICAgc3RyaW5nIEljb25OYW1lIHsgZ2V0OyBwcml2YXRlIHNldDsgfVxyXG5cclxuICAgICAgICB2b2lkIEF3YWtlKCk7XHJcbiAgICAgICAgdm9pZCBFbmFibGUoKTtcclxuICAgICAgICB2b2lkIERpc2FibGUoKTtcclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBCcmlkZ2UuSHRtbDU7XHJcbnVzaW5nIEZlc3RpdmFsX0JyaWRnZS5BcGkuVHlwZXM7XHJcbnVzaW5nIENTU1N0eWxlRGVjbGFyYXRpb24gPSBSZXR5cGVkLmRvbS5DU1NTdHlsZURlY2xhcmF0aW9uO1xyXG5cclxubmFtZXNwYWNlIEZlc3RpdmFsX0JyaWRnZS5BcGkuVG9vbHNcclxue1xyXG4gICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgLy8vIFV0aWxpdGllcyB0byBoZWxwIHRoZSBkcmF3aW5nIHRvb2xzLlxyXG4gICAgLy8vIDwvc3VtbWFyeT5cclxuICAgIHN0YXRpYyBjbGFzcyBUb29sVXRpbHNcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgY29uc3Qgc3RyaW5nIFN2Z05hbWVzcGFjZSA9IFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIjtcclxuXHJcbiAgICAgICAgc3RhdGljIHB1YmxpYyBSR0JBIEZvcmVncm91bmRDb2xvciA9IFwiIzAwMFwiO1xyXG4gICAgICAgIHN0YXRpYyBwdWJsaWMgUkdCQSBCYWNrZ3JvdW5kQ29sb3IgPSBcIiNmZmZcIjtcclxuXHJcbiAgICAgICAgc3RhdGljIHB1YmxpYyB2b2lkIEFwcGx5VXNlclN0eWxlKENTU1N0eWxlRGVjbGFyYXRpb24gc3R5bGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdHlsZS5maWxsID0gQmFja2dyb3VuZENvbG9yO1xyXG4gICAgICAgICAgICBzdHlsZS5zdHJva2UgPSBGb3JlZ3JvdW5kQ29sb3I7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIEJyaWRnZS5IdG1sNTtcclxudXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uVGV4dC5SZWd1bGFyRXhwcmVzc2lvbnM7XHJcblxyXG5uYW1lc3BhY2UgRmVzdGl2YWxfQnJpZGdlLkFwaS5UeXBlc1xyXG57XHJcbiAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAvLy8gVGhpcyBjbGFzcyBpcyB1c2VkIGJ5IDxzZWUgY3JlZj1cIlRvb2xzLlRvb2xVdGlsc1wiLz4gdG8gZGVzY3JpYmUgdGhlXHJcbiAgICAvLy8gdXNlciBzZWxlY3RlZCBmb3JlZ3JvdW5kIGFuZCBiYWNrZ3JvdW5kIGNvbG9ycy4gSXQgY2FuIGltcGxpY2l0bHlcclxuICAgIC8vLyBjb252ZXJ0IHRvIGEgQ1NTIHN0cmluZywgYmVpbmcgaXQgZWl0aGVyIGFuIGhleGEgcmVwcmVzZW50YXRpb25cclxuICAgIC8vLyAoPGM+Iy4uLi4uLjwvYz4pIG9yIGEgUkdCQSByZXByZXNlbnRhdGlvbiB3aXRoIGFscGhhIGNoYW5uZWxcclxuICAgIC8vLyAoPGM+cmdiYSguLi4sLi4uLC4uLiwuLi4pPC9jPikuIFRoZSBjbGFzcyBjYW4gcmVjZWl2ZSBpbXBsaWNpdGx5IHNvbWVcclxuICAgIC8vLyBDU1Mgc3RyaW5nIGZvcm1hdHMsIGxpa2UgdGhlIGhleGEgIyBzeW50YXggYW5kIHRoZSByZ2IsIGhzbCBhbmQgcmdiYVxyXG4gICAgLy8vIHBhdHRlcm5zLlxyXG4gICAgLy8vIDwvc3VtbWFyeT5cclxuICAgIC8vLyA8cmVtYXJrcz5UaGlzIGNsYXNzIGNhbiBiZSBlaXRoZXI6ICgxKSByZW1vdmVkIGlmIHJlcGxhY2VkIGJ5IHRoZVxyXG4gICAgLy8vIHN0cmluZyByZXByZXNlbnRhdGlvbiBpdHNlbGYgaW4gQ1NTOyAoMikgaXQgY2FuIGJlIHJlZmFjdG9yZWQgdG8gZml4XHJcbiAgICAvLy8gYW55IHByb2JsZW07IG9yIGl0IGNhbiBiZSBtb2RpZmllZCB0byBzdXBwb3J0IHBhdHRlcm5zLCB0ZXh0dXJlcyBhbmRcclxuICAgIC8vLyBncmFkaWVudHMuIEkgc3RpbGwgZG9uJ3Qga25vdyB3aGljaCBwYXRoIHRvIHRha2UuPC9yZW1hcmtzPlxyXG4gICAgc3RydWN0IFJHQkFcclxuICAgIHtcclxuICAgICAgICBzdGF0aWMgcHVibGljIFJHQkEgRnJvbVJHQihieXRlIHIsIGJ5dGUgZywgYnl0ZSBiLCBieXRlIGEgPSAyNTUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFJHQkEoKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBSZWQgPSByLFxyXG4gICAgICAgICAgICAgICAgR3JlZW4gPSBnLFxyXG4gICAgICAgICAgICAgICAgQmx1ZSA9IGIsXHJcbiAgICAgICAgICAgICAgICBBbHBoYSA9IGFcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0YXRpYyBwdWJsaWMgUkdCQSBGcm9tSFNMKGZsb2F0IGgsIGZsb2F0IHMsIGZsb2F0IGwsIGZsb2F0IGEgPSAyNTVmKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIEZyb21IZXhhKEV4dGVybmFscy5Ic2xUb0hleChoLCBzLCBsKSArICgoaW50KWEpLlRvU3RyaW5nKFwieFwiKS5QYWRMZWZ0KDIsICcwJykpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RhdGljIHB1YmxpYyBSR0JBIEZyb21IZXhhKHN0cmluZyBoZXhhKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3RyaW5nIHZhbHVlID0gaGV4YTtcclxuICAgICAgICAgICAgaWYgKHZhbHVlLlN0YXJ0c1dpdGgoXCIjXCIpKVxyXG4gICAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZS5TdWJzdHIoMSk7XHJcblxyXG4gICAgICAgICAgICBpZiAodmFsdWUuTGVuZ3RoID09IDMpXHJcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHN0cmluZy5Gb3JtYXQoXCJ7MH17MX17Mn17M317NH17NX1GRlwiLHZhbHVlWzBdLHZhbHVlWzBdLHZhbHVlWzFdLHZhbHVlWzFdLHZhbHVlWzJdLHZhbHVlWzJdKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh2YWx1ZS5MZW5ndGggPT0gNClcclxuICAgICAgICAgICAgICAgIHZhbHVlID0gc3RyaW5nLkZvcm1hdChcInswfXsxfXsyfXszfXs0fXs1fXs2fXs3fVwiLHZhbHVlWzBdLHZhbHVlWzBdLHZhbHVlWzFdLHZhbHVlWzFdLHZhbHVlWzJdLHZhbHVlWzJdLHZhbHVlWzNdLHZhbHVlWzNdKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh2YWx1ZS5MZW5ndGggPT0gNilcclxuICAgICAgICAgICAgICAgIHZhbHVlICs9IFwiRkZcIjtcclxuXHJcbiAgICAgICAgICAgIGJ5dGUgciA9IEV4dGVybmFscy5OdW1iZXJUb0J5dGUoXCIweFwiICsgdmFsdWUuU3Vic3RyaW5nKDAsIDIpKTtcclxuICAgICAgICAgICAgYnl0ZSBnID0gRXh0ZXJuYWxzLk51bWJlclRvQnl0ZShcIjB4XCIgKyB2YWx1ZS5TdWJzdHJpbmcoMiwgMikpO1xyXG4gICAgICAgICAgICBieXRlIGIgPSBFeHRlcm5hbHMuTnVtYmVyVG9CeXRlKFwiMHhcIiArIHZhbHVlLlN1YnN0cmluZyg0LCAyKSk7XHJcbiAgICAgICAgICAgIGJ5dGUgYSA9IEV4dGVybmFscy5OdW1iZXJUb0J5dGUoXCIweFwiICsgdmFsdWUuU3Vic3RyaW5nKDYsIDIpKTtcclxuICAgICAgICAgICAgcmV0dXJuIEZyb21SR0IociwgZywgYiwgYSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgY29uc3QgaW50IFJlZE9mZnNldCA9IDI0O1xyXG4gICAgICAgIHB1YmxpYyBjb25zdCBpbnQgR3JlZW5PZmZzZXQgPSAxNjtcclxuICAgICAgICBwdWJsaWMgY29uc3QgaW50IEJsdWVPZmZzZXQgPSA4O1xyXG4gICAgICAgIHB1YmxpYyBjb25zdCBpbnQgQWxwaGFPZmZzZXQgPSAwO1xyXG5cclxuICAgICAgICBwdWJsaWMgdWludCBWYWx1ZTtcclxuXHJcbiAgICAgICAgcHVibGljIGJ5dGUgUmVkIHtcclxuICAgIGdldFxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiAoYnl0ZSkoKFZhbHVlICYgMHhGRjAwMDAwMHUpID4+IFJlZE9mZnNldCk7XHJcbiAgICB9XHJcblxyXG4gICAgXHJcbiAgICBzZXRcclxuICAgIHtcclxuICAgICAgICBWYWx1ZSB8PSAodWludCl2YWx1ZSA8PCBSZWRPZmZzZXQ7XHJcbiAgICB9XHJcbiAgICBcclxufVxyXG4gICAgICAgIHB1YmxpYyBieXRlIEdyZWVuIHtcclxuICAgIGdldFxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiAoYnl0ZSkoKFZhbHVlICYgMHgwMEZGMDAwMHUpID4+IEdyZWVuT2Zmc2V0KTtcclxuICAgIH1cclxuXHJcbiAgICBcclxuICAgIHNldFxyXG4gICAge1xyXG4gICAgICAgIFZhbHVlIHw9ICh1aW50KXZhbHVlIDw8IEdyZWVuT2Zmc2V0O1xyXG4gICAgfVxyXG4gICAgXHJcbn1cclxuICAgICAgICBwdWJsaWMgYnl0ZSBCbHVlIHtcclxuICAgIGdldFxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiAoYnl0ZSkoKFZhbHVlICYgMHgwMDAwRkYwMHUpID4+IEJsdWVPZmZzZXQpO1xyXG4gICAgfVxyXG5cclxuICAgIFxyXG4gICAgc2V0XHJcbiAgICB7XHJcbiAgICAgICAgVmFsdWUgfD0gKHVpbnQpdmFsdWUgPDwgQmx1ZU9mZnNldDtcclxuICAgIH1cclxuICAgIFxyXG59XHJcbiAgICAgICAgcHVibGljIGJ5dGUgQWxwaGEge1xyXG4gICAgZ2V0XHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIChieXRlKSgoVmFsdWUgJiAweDAwMDAwMEZGdSkgPj4gQWxwaGFPZmZzZXQpO1xyXG4gICAgfVxyXG5cclxuICAgIFxyXG4gICAgc2V0XHJcbiAgICB7XHJcbiAgICAgICAgVmFsdWUgfD0gKHVpbnQpdmFsdWUgPDwgQWxwaGFPZmZzZXQ7XHJcbiAgICB9XHJcbiAgICBcclxufVxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBzdHJpbmcgVG9TdHJpbmcoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdGF0aWMgcHVibGljIGltcGxpY2l0IG9wZXJhdG9yIHN0cmluZyhSR0JBIHJnYmEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAocmdiYS5BbHBoYSA9PSAyNTUpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc3RyaW5nLkZvcm1hdChcIiN7MH17MX17Mn1cIixyZ2JhLlJlZC5Ub1N0cmluZyhcInhcIikuUGFkTGVmdCgyLCAnMCcpLHJnYmEuR3JlZW4uVG9TdHJpbmcoXCJ4XCIpLlBhZExlZnQoMiwgJzAnKSxyZ2JhLkJsdWUuVG9TdHJpbmcoXCJ4XCIpLlBhZExlZnQoMiwgJzAnKSk7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHJldHVybiBzdHJpbmcuRm9ybWF0KFwicmdiYSh7MH0sezF9LHsyfSx7M30pXCIscmdiYS5SZWQscmdiYS5HcmVlbixyZ2JhLkJsdWUscmdiYS5BbHBoYSAvIDI1NWYpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RhdGljIHB1YmxpYyBpbXBsaWNpdCBvcGVyYXRvciBSR0JBKHN0cmluZyB2YWx1ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmICh2YWx1ZS5TdGFydHNXaXRoKFwiI1wiKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIEZyb21IZXhhKHZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIGlmICh2YWx1ZS5Ub0xvd2VyQ2FzZSgpLlN0YXJ0c1dpdGgoXCJoc2xcIikpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIE1hdGNoIG0gPSBSZWdleC5NYXRjaCh2YWx1ZS5UcmltKCkuVG9Mb3dlcigpLCBAXCJoc2wgKlxcKCAqKFxcZCpbLl1cXGQrfFxcZCspKD86ZGVnKT8gKiwgKihcXGQqWy5dXFxkK3xcXGQrKSU/ICosICooXFxkKlsuXVxcZCt8XFxkKyklPyAqKD86LCAqKFxcZCpbLl1cXGQrfFxcZCspICopP1xcKVwiKTtcclxuICAgICAgICAgICAgICAgIGlmIChtLkdyb3Vwc1s0XS5TdWNjZXNzKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBGcm9tSFNMKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBFeHRlcm5hbHMuTnVtYmVyVG9GbG9hdChtLkdyb3Vwc1sxXS5WYWx1ZSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEV4dGVybmFscy5OdW1iZXJUb0Zsb2F0KG0uR3JvdXBzWzJdLlZhbHVlKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgRXh0ZXJuYWxzLk51bWJlclRvRmxvYXQobS5Hcm91cHNbM10uVmFsdWUpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBFeHRlcm5hbHMuTnVtYmVyVG9GbG9hdChtLkdyb3Vwc1s0XS5WYWx1ZSkgKiAyNTVmXHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gRnJvbUhTTChcclxuICAgICAgICAgICAgICAgICAgICAgICAgRXh0ZXJuYWxzLk51bWJlclRvRmxvYXQobS5Hcm91cHNbMV0uVmFsdWUpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBFeHRlcm5hbHMuTnVtYmVyVG9GbG9hdChtLkdyb3Vwc1syXS5WYWx1ZSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEV4dGVybmFscy5OdW1iZXJUb0Zsb2F0KG0uR3JvdXBzWzNdLlZhbHVlKVxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICBpZiAodmFsdWUuVG9Mb3dlckNhc2UoKS5TdGFydHNXaXRoKFwicmdiYVwiKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgTWF0Y2ggbSA9IFJlZ2V4Lk1hdGNoKHZhbHVlLlRyaW0oKS5Ub0xvd2VyKCksIEBcInJnYmEgKlsoXSAqKFxcZCpbLl1cXGQrfFxcZCspICosICooXFxkKlsuXVxcZCt8XFxkKykgKiwgKihcXGQqWy5dXFxkK3xcXGQrKSAqLCAqKFxcZCpbLl1cXGQrfFxcZCspICpbKV1cIik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gRnJvbVJHQihcclxuICAgICAgICAgICAgICAgICAgICBFeHRlcm5hbHMuTnVtYmVyVG9CeXRlKG0uR3JvdXBzWzFdLlZhbHVlKSxcclxuICAgICAgICAgICAgICAgICAgICBFeHRlcm5hbHMuTnVtYmVyVG9CeXRlKG0uR3JvdXBzWzJdLlZhbHVlKSxcclxuICAgICAgICAgICAgICAgICAgICBFeHRlcm5hbHMuTnVtYmVyVG9CeXRlKG0uR3JvdXBzWzNdLlZhbHVlKSxcclxuICAgICAgICAgICAgICAgICAgICAoYnl0ZSkoRXh0ZXJuYWxzLk51bWJlclRvRmxvYXQobS5Hcm91cHNbNF0uVmFsdWUpICogMjU1ZilcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICBpZiAodmFsdWUuVG9Mb3dlckNhc2UoKS5TdGFydHNXaXRoKFwicmdiXCIpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBNYXRjaCBtID0gUmVnZXguTWF0Y2godmFsdWUuVHJpbSgpLlRvTG93ZXIoKSwgQFwicmdiICpbKF0gKihcXGQqWy5dXFxkK3xcXGQrKSAqLCAqKFxcZCpbLl1cXGQrfFxcZCspICosICooXFxkKlsuXVxcZCt8XFxkKykgKlspXVwiKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBGcm9tUkdCKFxyXG4gICAgICAgICAgICAgICAgICAgIEV4dGVybmFscy5OdW1iZXJUb0J5dGUobS5Hcm91cHNbMV0uVmFsdWUpLFxyXG4gICAgICAgICAgICAgICAgICAgIEV4dGVybmFscy5OdW1iZXJUb0J5dGUobS5Hcm91cHNbMl0uVmFsdWUpLFxyXG4gICAgICAgICAgICAgICAgICAgIEV4dGVybmFscy5OdW1iZXJUb0J5dGUobS5Hcm91cHNbM10uVmFsdWUpXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEV4Y2VwdGlvbihcIk5vdCBpbXBsZW1lbnRlZCBSR0JBIGNvbnZlcnRlciBmb3I6IFwiICsgdmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIEJyaWRnZTtcclxudXNpbmcgQnJpZGdlLmpRdWVyeTI7XHJcbnVzaW5nIEZlc3RpdmFsX0JyaWRnZS5BcGk7XHJcbnVzaW5nIEZlc3RpdmFsX0JyaWRnZS5BcGkuVHlwZXM7XHJcbnVzaW5nIEZlc3RpdmFsX0JyaWRnZS5EZWJ1Z2dlcnM7XHJcbnVzaW5nIFN5c3RlbTtcclxuXHJcbm5hbWVzcGFjZSBGZXN0aXZhbF9CcmlkZ2Vcclxue1xyXG4gICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgLy8vIFRoaXMgaXMgdGhlIEJyaWRnZS5ORVQgZW50cnkgcG9pbnQuXHJcbiAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgcHVibGljIGNsYXNzIEFwcFxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBNYWluKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIENvbnNvbGUuV3JpdGVMaW5lKFwiV2VsY29tZSB0byBCcmlkZ2UuTkVUXCIpO1xyXG5cclxuICAgICAgICAgICAgalF1ZXJ5LlJlYWR5KChBY3Rpb24pKCgpID0+XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIENvbnNvbGUuV3JpdGVMaW5lKFwialF1ZXJ5IHN0YXJ0ZWRcIik7XHJcbiAgICAgICAgICAgICAgICBJbml0QWxsLkluaXRpYWxpemVBbGwoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBqUXVlcnkuUmVhZHkoKEFjdGlvbilUZXN0QW5kRGVidWcpO1xyXG4gICAgICAgICAgICB9KSk7XHJcblxyXG4gICAgICAgICAgICAvLyBCUklER0UuTkVUIHNheXM6XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyBBZnRlciBidWlsZGluZyAoQ3RybCArIFNoaWZ0ICsgQikgdGhpcyBwcm9qZWN0LCBcclxuICAgICAgICAgICAgLy8gYnJvd3NlIHRvIHRoZSAuLi9icmlkZ2VqcyBvciAvYmluL0RlYnVnIGZvbGRlci5cclxuXHJcbiAgICAgICAgICAgIC8vIFRoZSBicmlkZ2Vqcy8gZm9sZGVyIGNvbnRhaW5zIHlvdXIgcHJvamVjdHNcclxuICAgICAgICAgICAgLy8gSmF2YVNjcmlwdCBmaWxlcy4gXHJcblxyXG4gICAgICAgICAgICAvLyBPcGVuIHRoZSBpbmRleC5odG1sIGZpbGUgaW4gYSBicm93c2VyIGJ5XHJcbiAgICAgICAgICAgIC8vIFJpZ2h0LUNsaWNrID4gT3BlbiBXaXRoLi4uLCB0aGVuIGNob29zZSBhXHJcbiAgICAgICAgICAgIC8vIHdlYiBicm93c2VyIGZyb20gdGhlIGxpc3RcclxuICAgICAgICAgICAgLy8gKEZlc3RpdmFsIG5vdGU6IGZvciBub3csIGl0IGRvZXMgbm90IHJlcXVpcmUgYVxyXG4gICAgICAgICAgICAvLyAgd2ViIHNlcnZlciB0byBydW4pXHJcblxyXG4gICAgICAgICAgICAvLyBUaGlzIGFwcGxpY2F0aW9uIHdpbGwgdGhlbiBydW4gaW4gdGhlIGJyb3dzZXIuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyB2b2lkIFRlc3RBbmREZWJ1ZygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBuZXcgRGVidWdQb2ludGVyVG9DYW52YXMoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJ1c2luZyBCcmlkZ2UualF1ZXJ5MjtcclxudXNpbmcgQnJpZGdlLlV0aWxzO1xyXG51c2luZyBGZXN0aXZhbF9CcmlkZ2UuQXBpLkVsZW1lbnRzO1xyXG51c2luZyBGZXN0aXZhbF9CcmlkZ2UuQXBpLkV2ZW50cztcclxudXNpbmcgRmVzdGl2YWxfQnJpZGdlLkFwaS5NYW5hZ2VkQWN0aW9ucztcclxuXHJcbm5hbWVzcGFjZSBGZXN0aXZhbF9CcmlkZ2UuRGVidWdnZXJzXHJcbntcclxuICAgIC8vLyA8c3VtbWFyeT5cclxuICAgIC8vLyBUaGlzIGNsYXNzIGlzIGZvciBkZWJ1Z2dpbmcgYW5kIGhlbHBzIHRvIHNlZSBpbmZvcm1hdGlvbiBhYm91dCBoYW5kXHJcbiAgICAvLy8gZXZlbnRzIGluIFN0YWdlIGFuZCBDYW52YXMuIEl0IGlzIGludGVuZGVkIGZvciBkZXZlbG9wZXJzLCBub3QgZW5kXHJcbiAgICAvLy8gdXNlcnMuXHJcbiAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgY2xhc3MgRGVidWdQb2ludGVyVG9DYW52YXNcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgRGVidWdQb2ludGVyVG9DYW52YXMoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgalF1ZXJ5IGRlYnVnID0gbmV3IGpRdWVyeShcIiNkZWJ1Z0FyZWFcIik7XHJcblxyXG4gICAgICAgICAgICBFdmVudE1hbmFnZXIuT248UG9pbnRlckRvd25TaWduYWw+KChTeXN0ZW0uQWN0aW9uPFBvaW50ZXJEb3duU2lnbmFsPikoZSA9PlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBkZWJ1Zy5DaGlsZHJlbihcIi5wb2ludGVyLWV2ZW50XCIpLlRleHQoXCJEb3duXCIpO1xyXG4gICAgICAgICAgICAgICAgZGVidWcuQ2hpbGRyZW4oXCIucG9pbnRlci1idXR0b25cIikuVGV4dChNb2RpZmllcnMoZSkpO1xyXG4gICAgICAgICAgICAgICAgZGVidWcuQ2hpbGRyZW4oXCIucG9pbnRlci1zdGFydFwiKS5UZXh0KHN0cmluZy5Gb3JtYXQoXCIoezB9LCB7MX0pXCIsZS5TdGFnZVgsZS5TdGFnZVkpKTtcclxuICAgICAgICAgICAgICAgIGRlYnVnLkNoaWxkcmVuKFwiLnBvaW50ZXItZW5kXCIpLlRleHQoc3RyaW5nLkZvcm1hdChcIm4vYVwiKSk7XHJcbiAgICAgICAgICAgICAgICBkZWJ1Zy5DaGlsZHJlbihcIi5wb2ludGVyLXNpemVcIikuVGV4dChzdHJpbmcuRm9ybWF0KFwiKDAsIDApXCIpKTtcclxuICAgICAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICAgICAgRXZlbnRNYW5hZ2VyLk9uPFBvaW50ZXJVcFNpZ25hbD4oKFN5c3RlbS5BY3Rpb248UG9pbnRlclVwU2lnbmFsPikoZSA9PlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBkZWJ1Zy5DaGlsZHJlbihcIi5wb2ludGVyLWV2ZW50XCIpLlRleHQoXCJVcFwiKTtcclxuICAgICAgICAgICAgICAgIGRlYnVnLkNoaWxkcmVuKFwiLnBvaW50ZXItYnV0dG9uXCIpLlRleHQoTW9kaWZpZXJzKGUpKTtcclxuICAgICAgICAgICAgICAgIGRlYnVnLkNoaWxkcmVuKFwiLnBvaW50ZXItc3RhcnRcIikuVGV4dChzdHJpbmcuRm9ybWF0KFwiKHswfSwgezF9KVwiLGUuQW5jaG9yZWRTdGFnZVgsZS5BbmNob3JlZFN0YWdlWSkpO1xyXG4gICAgICAgICAgICAgICAgZGVidWcuQ2hpbGRyZW4oXCIucG9pbnRlci1lbmRcIikuVGV4dChzdHJpbmcuRm9ybWF0KFwiKHswfSwgezF9KVwiLGUuU3RhZ2VYLGUuU3RhZ2VZKSk7XHJcbiAgICAgICAgICAgICAgICBkZWJ1Zy5DaGlsZHJlbihcIi5wb2ludGVyLXNpemVcIikuVGV4dChzdHJpbmcuRm9ybWF0KFwiKHswfSwgezF9KVwiLGUuV2lkdGgsZS5IZWlnaHQpKTtcclxuICAgICAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICAgICAgRXZlbnRNYW5hZ2VyLk9uPFBvaW50ZXJIb3ZlclNpZ25hbD4oKFN5c3RlbS5BY3Rpb248UG9pbnRlckhvdmVyU2lnbmFsPikoZSA9PlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBkZWJ1Zy5DaGlsZHJlbihcIi5wb2ludGVyLWV2ZW50XCIpLlRleHQoXCJIb3ZlclwiKTtcclxuICAgICAgICAgICAgICAgIGRlYnVnLkNoaWxkcmVuKFwiLnBvaW50ZXItYnV0dG9uXCIpLlRleHQoTW9kaWZpZXJzKGUpKTtcclxuICAgICAgICAgICAgICAgIGRlYnVnLkNoaWxkcmVuKFwiLnBvaW50ZXItc3RhcnRcIikuVGV4dChzdHJpbmcuRm9ybWF0KFwiKHswfSwgezF9KVwiLGUuU3RhZ2VYLGUuU3RhZ2VZKSk7XHJcbiAgICAgICAgICAgICAgICBkZWJ1Zy5DaGlsZHJlbihcIi5wb2ludGVyLWVuZFwiKS5UZXh0KHN0cmluZy5Gb3JtYXQoXCJuL2FcIikpO1xyXG4gICAgICAgICAgICAgICAgZGVidWcuQ2hpbGRyZW4oXCIucG9pbnRlci1zaXplXCIpLlRleHQoc3RyaW5nLkZvcm1hdChcIm4vYVwiKSk7XHJcbiAgICAgICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgICAgIEV2ZW50TWFuYWdlci5PbjxQb2ludGVyRHJhZ1NpZ25hbD4oKFN5c3RlbS5BY3Rpb248UG9pbnRlckRyYWdTaWduYWw+KShlID0+XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGRlYnVnLkNoaWxkcmVuKFwiLnBvaW50ZXItZXZlbnRcIikuVGV4dChcIkRyYWdcIik7XHJcbiAgICAgICAgICAgICAgICBkZWJ1Zy5DaGlsZHJlbihcIi5wb2ludGVyLWJ1dHRvblwiKS5UZXh0KE1vZGlmaWVycyhlKSk7XHJcbiAgICAgICAgICAgICAgICBkZWJ1Zy5DaGlsZHJlbihcIi5wb2ludGVyLXN0YXJ0XCIpLlRleHQoc3RyaW5nLkZvcm1hdChcIih7MH0sIHsxfSlcIixlLkFuY2hvcmVkU3RhZ2VYLGUuQW5jaG9yZWRTdGFnZVkpKTtcclxuICAgICAgICAgICAgICAgIGRlYnVnLkNoaWxkcmVuKFwiLnBvaW50ZXItZW5kXCIpLlRleHQoc3RyaW5nLkZvcm1hdChcIih7MH0sIHsxfSlcIixlLlN0YWdlWCxlLlN0YWdlWSkpO1xyXG4gICAgICAgICAgICAgICAgZGVidWcuQ2hpbGRyZW4oXCIucG9pbnRlci1zaXplXCIpLlRleHQoc3RyaW5nLkZvcm1hdChcIih7MH0sIHsxfSlcIixlLldpZHRoLGUuSGVpZ2h0KSk7XHJcbiAgICAgICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgICAgIEV2ZW50TWFuYWdlci5PbjxPblJlZ2lzdGVyTWFuYWdlZEFjdGlvbkV2ZW50PigoU3lzdGVtLkFjdGlvbjxPblJlZ2lzdGVyTWFuYWdlZEFjdGlvbkV2ZW50PikoZSA9PlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBDb25zb2xlLkxvZyhzdHJpbmcuRm9ybWF0KFwiVW5kbyB7MH1cIixlLk1hbmFnZWRBY3Rpb24uRGlzcGxheU5hbWUpKTtcclxuICAgICAgICAgICAgICAgIGpRdWVyeSB1bmRvID0gbmV3IGpRdWVyeShcIiNtYWluLW1lbnUtdW5kb1wiKS5BdHRyKFwidGl0bGVcIiwgc3RyaW5nLkZvcm1hdChcIlVuZG8gezB9XCIsZS5NYW5hZ2VkQWN0aW9uLkRpc3BsYXlOYW1lKSk7XHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RyaW5nIE1vZGlmaWVycyhQb2ludGVyU2lnbmFsQmFzZSBlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3RyaW5nIHMgPSBcIlwiO1xyXG4gICAgICAgICAgICBpZiAoZS5TaGlmdEtleSlcclxuICAgICAgICAgICAgICAgIHMgKz0gXCJTaGlmdCtcIjtcclxuICAgICAgICAgICAgaWYgKGUuQ3RybEtleSlcclxuICAgICAgICAgICAgICAgIHMgKz0gXCJDdHJsK1wiO1xyXG4gICAgICAgICAgICBpZiAoZS5BbHRLZXkpXHJcbiAgICAgICAgICAgICAgICBzICs9IFwiQWx0K1wiO1xyXG5cclxuICAgICAgICAgICAgaW50IG1iID0gLTE7XHJcblBvaW50ZXJEb3duU2lnbmFsIGRvd247ICAgICAgICAgICAgaWYgKChkb3duID0gZSBhcyBQb2ludGVyRG93blNpZ25hbCkgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgIG1iID0gZG93bi5Nb3VzZUJ1dHRvbjtcclxuUG9pbnRlclVwU2lnbmFsIHVwOyAgICAgICAgICAgIGlmICgodXAgPSBlIGFzIFBvaW50ZXJVcFNpZ25hbCkgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgIG1iID0gdXAuTW91c2VCdXR0b247XHJcblBvaW50ZXJEcmFnU2lnbmFsIGRyYWc7ICAgICAgICAgICAgaWYgKChkcmFnID0gZSBhcyBQb2ludGVyRHJhZ1NpZ25hbCkgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgIG1iID0gZHJhZy5Nb3VzZUJ1dHRvbjtcclxuXHJcbiAgICAgICAgICAgIGlmIChtYiA9PSAtMSlcclxuICAgICAgICAgICAgICAgIHMgKz0gXCJOb25lXCI7XHJcbiAgICAgICAgICAgIGlmIChtYiA8IC0xIHx8IG1iID4gMylcclxuICAgICAgICAgICAgICAgIHMgKz0gXCJDdXN0b20oXCIgKyBtYitcIilcIjtcclxuICAgICAgICAgICAgaWYgKG1iID09IDApXHJcbiAgICAgICAgICAgICAgICBzICs9IFwiTGVmdFwiO1xyXG4gICAgICAgICAgICBpZiAobWIgPT0gMSlcclxuICAgICAgICAgICAgICAgIHMgKz0gXCJNaWRkbGVcIjtcclxuICAgICAgICAgICAgaWYgKG1iID09IDIpXHJcbiAgICAgICAgICAgICAgICBzICs9IFwiUmlnaHRcIjtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBzO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBCcmlkZ2UuSHRtbDU7XHJcblxyXG5uYW1lc3BhY2UgRmVzdGl2YWxfQnJpZGdlLkxhbmd1YWdlc1xyXG57XHJcbiAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAvLy8gQSBzaWxseSBjb25zaWRlcmF0aW9uIGFib3V0IG11bHRpLWxhbmd1YWdlIGFuZCBpbnRlcm5hdGlvbmFsaXphdGlvbi4gSXRcclxuICAgIC8vLyBpcyBub3QgY3VycmVudGx5IGluIHVzZS5cclxuICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICBzdGF0aWMgY2xhc3MgTGFuZ1xyXG4gICAge1xyXG4gICAgICAgIHN0YXRpYyBwdWJsaWMgc3RyaW5nIFRyYW5zbGF0ZShzdHJpbmcgcGhyYXNlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgYm9vbCBoYXNLZXkgPSBXaW5kb3cuSW5zdGFuY2UuSGFzT3duUHJvcGVydHkoXCJsYW5nXCIpXHJcbiAgICAgICAgICAgICAgICAmJiBXaW5kb3cuSW5zdGFuY2VbXCJsYW5nXCJdLkhhc093blByb3BlcnR5KFwiY3VycmVudFwiKVxyXG4gICAgICAgICAgICAgICAgJiYgV2luZG93Lkluc3RhbmNlW1wibGFuZ1wiXVtcImN1cnJlbnRcIl0uSGFzT3duUHJvcGVydHkocGhyYXNlKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBoYXNLZXkgPyAoc3RyaW5nKVdpbmRvdy5JbnN0YW5jZVtcImxhbmdcIl1bXCJjdXJyZW50XCJdW3BocmFzZV0gOiBwaHJhc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIEJyaWRnZS5qUXVlcnkyO1xyXG51c2luZyBGZXN0aXZhbF9CcmlkZ2UuQXBpLlRvb2xzO1xyXG5cclxubmFtZXNwYWNlIEZlc3RpdmFsX0JyaWRnZS5Ub29sc1xyXG57XHJcbiAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAvLy8gVGhlIGluZGV4IG9mIHRvb2xzIGN1cnJlbnRseSBhY3RpdmUgaW4gdGhlIGFwcGxpY2F0aW9uLiBFYWNoIGVudHJ5IGluXHJcbiAgICAvLy8gaXRzIGFycmF5IHJlcHJlc2VudHMgYSBuZXcgdG9vbCBhdmFpbGFibGUgdG8gdXNlIHRocm91Z2ggYW4gaWNvbiBpbiB0aGVcclxuICAgIC8vLyBkcmF3aW5nIHRvb2xzIHRvb2xiYXIuXHJcbiAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgY2xhc3MgSW5kZXhcclxuICAgIHtcclxuICAgICAgICBzdGF0aWMgcHJvdGVjdGVkIElUb29sW10gVG9vbHMgPVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbmV3IERlYnVnUmVjdFRvb2woKSxcclxuICAgICAgICAgICAgbmV3IERlYnVnUmVjdFRvb2woKSxcclxuICAgICAgICAgICAgbmV3IFJlY3RUb29sKCksXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgc3RhdGljIHB1YmxpYyB2b2lkIEluaXQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgalF1ZXJ5LlJlYWR5KChTeXN0ZW0uQWN0aW9uKSgoKSA9PlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBmb3JlYWNoICh2YXIgdG9vbCBpbiBUb29scylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBUb29sTWFuYWdlci5JbnN0YW5jZS5SZWdpc3Rlcih0b29sKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBCcmlkZ2UualF1ZXJ5MjtcclxudXNpbmcgRmVzdGl2YWxfQnJpZGdlLkFwaS5Ub29scztcclxuXHJcbm5hbWVzcGFjZSBGZXN0aXZhbF9CcmlkZ2UuQXBpLkVkaXRvckNvbXBvbmVudHMuTGF5ZXJzXHJcbntcclxuICAgIC8vLyA8c3VtbWFyeT5cclxuICAgIC8vLyBBIENhbnZhcyBkcmF3aW5nIGxheWVyLCBjYXBhYmxlIG9mIG1hbmFnaW5nIGFuIFNWRyBkcmF3aW5nLlxyXG4gICAgLy8vIDwvc3VtbWFyeT5cclxuICAgIGNsYXNzIFN2Z0xheWVyIDogQ3VzdG9tTGF5ZXJcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgUmV0eXBlZC5kb20uU1ZHU1ZHRWxlbWVudCBTdmdFbGVtZW50O1xyXG5cclxuICAgICAgICBwdWJsaWMgU3ZnTGF5ZXIoU3RhZ2VDYW52YXMgY2FudmFzLCBzdHJpbmcgbmFtZSlcclxuICAgICAgICAgICAgOiBiYXNlKGNhbnZhcywgbmFtZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFN2Z0VsZW1lbnQgPSBSZXR5cGVkLmRvbS5kb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoVG9vbFV0aWxzLlN2Z05hbWVzcGFjZSwgXCJzdmdcIikgYXMgUmV0eXBlZC5kb20uU1ZHU1ZHRWxlbWVudDtcclxuICAgICAgICAgICAgRWxlbWVudCA9IG5ldyBqUXVlcnkoU3ZnRWxlbWVudCk7XHJcbiAgICAgICAgICAgIEVsZW1lbnQuQXBwZW5kVG8oY2FudmFzLkVsZW1lbnQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgI3JlZ2lvbiBJbnRlcmFjdGlvbnMgd2l0aCBsYXllclxyXG5cclxuICAgICAgICAjZW5kcmVnaW9uXHJcbiAgICB9XHJcbn0iLCJ1c2luZyBCcmlkZ2UualF1ZXJ5MjtcclxudXNpbmcgRmVzdGl2YWxfQnJpZGdlLkFwaS5NYW5hZ2VkQWN0aW9ucztcclxudXNpbmcgRmVzdGl2YWxfQnJpZGdlLkFwaS5Ub29scztcclxuXHJcbm5hbWVzcGFjZSBGZXN0aXZhbF9CcmlkZ2UuTWFuYWdlZEFjdGlvbnMuQmFzZVxyXG57XHJcbiAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAvLy8gQSBtYW5hZ2VkIGFjdGlvbiB0aGF0IGNyZWF0ZXMgU1ZHIGVsZW1lbnRzLiBUaGlzIGFjdGlvbiBpcyBub3QgdXNlZFxyXG4gICAgLy8vIGRpcmVjdGx5LCBidXQgaXMgdGhlIGJhc2lzIG9mIGRyYXdpbmcgYWN0aW9ucywgc3VjaCBhcyB0aGUgcmVjdGFuZ2xlIG9yXHJcbiAgICAvLy8gZWxsaXBzZSB0b29sLlxyXG4gICAgLy8vIDwvc3VtbWFyeT5cclxuICAgIC8vLyA8dHlwZXBhcmFtIG5hbWU9XCJUU3ZnXCI+VGhlIGNsYXNzIG9mIHRoZSBTVkcgZWxlbWVudC48L3R5cGVwYXJhbT5cclxuICAgIGFic3RyYWN0IGNsYXNzIENyZWF0ZVN2Z0VsZW1lbnQ8VFN2Zz4gOiBJTWFuYWdlZEFjdGlvblxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBhYnN0cmFjdCBzdHJpbmcgRGlzcGxheU5hbWUgeyBnZXQ7IH1cclxuXHJcbiAgICAgICAgcHVibGljIGFic3RyYWN0IHN0cmluZyBTdmdUYWdOYW1lIHsgZ2V0OyB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBUU3ZnIEVsZW1lbnQ7XHJcbiAgICAgICAgcHVibGljIGpRdWVyeSBQYXJlbnRFbGVtZW50O1xyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgaW50IFN0YXJ0WDtcclxuICAgICAgICBwcm90ZWN0ZWQgaW50IFN0YXJ0WTtcclxuICAgICAgICBwcm90ZWN0ZWQgaW50IEVuZFg7XHJcbiAgICAgICAgcHJvdGVjdGVkIGludCBFbmRZO1xyXG5wcm90ZWN0ZWQgaW50IFdpZHRoXHJcbntcclxuICAgIGdldFxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBFbmRYIC0gU3RhcnRYO1xyXG4gICAgfVxyXG59cHJvdGVjdGVkIGludCBIZWlnaHRcclxue1xyXG4gICAgZ2V0XHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIEVuZFkgLSBTdGFydFk7XHJcbiAgICB9XHJcbn1cclxuICAgICAgICBwdWJsaWMgQ3JlYXRlU3ZnRWxlbWVudChqUXVlcnkgcGFyZW50KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgUGFyZW50RWxlbWVudCA9IHBhcmVudDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZpcnR1YWwgcHVibGljIHZvaWQgUmVmcmVzaEVsZW1lbnQoVFN2ZyBlbGVtZW50KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgVG9vbFV0aWxzLkFwcGx5VXNlclN0eWxlKEZlc3RpdmFsX0JyaWRnZS5FeHRlcm5hbHMuVW50eXBlPFJldHlwZWQuZG9tLlNWR0VsZW1lbnQ+KGVsZW1lbnQpLnN0eWxlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERvKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEVsZW1lbnQgPSBGZXN0aXZhbF9CcmlkZ2UuRXh0ZXJuYWxzLlVudHlwZTxUU3ZnPihSZXR5cGVkLmRvbS5kb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoVG9vbFV0aWxzLlN2Z05hbWVzcGFjZSwgU3ZnVGFnTmFtZSkpO1xyXG4gICAgICAgICAgICBQYXJlbnRFbGVtZW50LkFwcGVuZChGZXN0aXZhbF9CcmlkZ2UuRXh0ZXJuYWxzLlVudHlwZTxCcmlkZ2UuSHRtbDUuRWxlbWVudD4oRWxlbWVudCkpO1xyXG4gICAgICAgICAgICBSZWZyZXNoRWxlbWVudChFbGVtZW50KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBib29sIElzTnVsbFNpemUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIFdpZHRoID09IDAgfHwgSGVpZ2h0ID09IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBTZXRTZWxlY3RlZFJlY3QoaW50IHN0YXJ0WCwgaW50IHN0YXJ0WSwgaW50IGVuZFgsIGludCBlbmRZKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgU3RhcnRYID0gc3RhcnRYO1xyXG4gICAgICAgICAgICBTdGFydFkgPSBzdGFydFk7XHJcbiAgICAgICAgICAgIEVuZFggPSBlbmRYO1xyXG4gICAgICAgICAgICBFbmRZID0gZW5kWTtcclxuICAgICAgICAgICAgUmVmcmVzaEVsZW1lbnQoRWxlbWVudCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgYm9vbCBVbmRvKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChFbGVtZW50ICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICBGZXN0aXZhbF9CcmlkZ2UuRXh0ZXJuYWxzLlVudHlwZTxSZXR5cGVkLmRvbS5TVkdFbGVtZW50PihFbGVtZW50KS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgRWxlbWVudCA9IGRlZmF1bHQoVFN2Zyk7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBCcmlkZ2UuSHRtbDU7XHJcbnVzaW5nIEZlc3RpdmFsX0JyaWRnZS5BcGkuRWxlbWVudHM7XHJcbnVzaW5nIEZlc3RpdmFsX0JyaWRnZS5BcGkuRXZlbnRzO1xyXG51c2luZyBGZXN0aXZhbF9CcmlkZ2UuQXBpLlRvb2xiYXJzO1xyXG51c2luZyBGZXN0aXZhbF9CcmlkZ2UuQXBpLlRvb2xzO1xyXG51c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcbnVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XHJcblxyXG5uYW1lc3BhY2UgRmVzdGl2YWxfQnJpZGdlLlRvb2xzXHJcbntcclxuICAgIC8vLyA8c3VtbWFyeT5cclxuICAgIC8vLyBBIGRlYnVnIHRvb2wgdGhhdCBkcmF3cyBhIGRvdHRlZCByZWN0YW5nbGUgbGlrZSBhIHNlbGVjdGlvbiB0b29sLCBidXRcclxuICAgIC8vLyBpdCBkb2VzIG5vdGhpbmcgdGhhbiBzaG93aW5nIHRoZSByZWN0YW5nbGUgb24gcG9pbnRlciBkb3duIGFuZCByZW1vdmluZ1xyXG4gICAgLy8vIGl0IG9uIHBvaW50ZXIgdXAuIEl0IHdhcyB0aGUgZmlyc3QgYW5kIHRoZSBpbnNwaXJhdGlvbmFsIHRvb2wuXHJcbiAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgY2xhc3MgRGVidWdSZWN0VG9vbCA6IElUb29sXHJcbiAgICB7XHJcbnB1YmxpYyBzdHJpbmcgVG9vbElkXHJcbntcclxuICAgIGdldFxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBcImRlYnVnLXJlY3QtXCIgKyBHZXRIYXNoQ29kZSgpO1xyXG4gICAgfVxyXG59cHVibGljIHN0cmluZyBJY29uTmFtZVxyXG57XHJcbiAgICBnZXRcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gXCJpY29uczgtY3Vyc29yLTMyXCI7XHJcbiAgICB9XHJcbn1wdWJsaWMgY2hhciBIb3RLZXlcclxue1xyXG4gICAgZ2V0XHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuICdWJztcclxuICAgIH1cclxufXB1YmxpYyBzdHJpbmcgRGlzcGxheU5hbWVcclxue1xyXG4gICAgZ2V0XHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIFwiRGVidWdSZWN0XCI7XHJcbiAgICB9XHJcbn1wdWJsaWMgQ2F0ZWdvcnlOYW1lIENhdGVnb3J5XHJcbntcclxuICAgIGdldFxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBDYXRlZ29yeU5hbWUuTm9DYXRlZ29yeTtcclxuICAgIH1cclxufVxyXG4gICAgICAgIHB1YmxpYyBIVE1MRGl2RWxlbWVudCBlbGVtZW50O1xyXG5cclxuICAgICAgICBwcml2YXRlIHN0cmluZyBib3JkZXJDb2xvcjtcclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgQXdha2UoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgUmFuZG9tIHJhbmRvbSA9IG5ldyBSYW5kb20oKTtcclxuICAgICAgICAgICAgYm9yZGVyQ29sb3IgPSBzdHJpbmcuRm9ybWF0KFwiaHNsKHswfSwgMTAwJSwgNDAlKVwiLHJhbmRvbS5OZXh0KDM2MCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRW5hYmxlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQgPSBEb2N1bWVudC5DcmVhdGVFbGVtZW50PEhUTUxEaXZFbGVtZW50PihcIkRJVlwiKTtcclxuICAgICAgICAgICAgZWxlbWVudC5TdHlsZS5Cb3JkZXIgPSBzdHJpbmcuRm9ybWF0KFwiMXB4IGRhc2hlZCB7MH1cIixib3JkZXJDb2xvcik7XHJcbiAgICAgICAgICAgIGVsZW1lbnQuU3R5bGUuUG9zaXRpb24gPSBcImFic29sdXRlXCI7XHJcbiAgICAgICAgICAgIGVsZW1lbnQuU3R5bGUuRGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgICAgICAgICBlbGVtZW50LlN0eWxlLlBvaW50ZXJFdmVudHMgPSBcIm5vbmVcIjtcclxuICAgICAgICAgICAgZWxlbWVudC5TdHlsZS5aSW5kZXggPSBcIjk5OTk5OVwiO1xyXG4gICAgICAgICAgICBTZXREaXZQb3NpdGlvbigwLCAwLCAwLCAwKTtcclxuICAgICAgICAgICAgRWxlbWVudHNNYW5hZ2VyLlZpZXdwb3J0U3RhZ2UuQXBwZW5kKGVsZW1lbnQpO1xyXG5cclxuICAgICAgICAgICAgRXZlbnRNYW5hZ2VyLk9uPFBvaW50ZXJEb3duU2lnbmFsPigoQWN0aW9uPFBvaW50ZXJEb3duU2lnbmFsPilQb2ludGVyRG93bik7XHJcbiAgICAgICAgICAgIEV2ZW50TWFuYWdlci5PbjxQb2ludGVyRHJhZ1NpZ25hbD4oKEFjdGlvbjxQb2ludGVyRHJhZ1NpZ25hbD4pUG9pbnRlckRyYWcpO1xyXG4gICAgICAgICAgICBFdmVudE1hbmFnZXIuT248UG9pbnRlclVwU2lnbmFsPigoQWN0aW9uPFBvaW50ZXJVcFNpZ25hbD4pUG9pbnRlclVwKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERpc2FibGUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgRXZlbnRNYW5hZ2VyLk9mZjxQb2ludGVyRG93blNpZ25hbD4oKEFjdGlvbjxQb2ludGVyRG93blNpZ25hbD4pUG9pbnRlckRvd24pO1xyXG4gICAgICAgICAgICBFdmVudE1hbmFnZXIuT2ZmPFBvaW50ZXJEcmFnU2lnbmFsPigoQWN0aW9uPFBvaW50ZXJEcmFnU2lnbmFsPilQb2ludGVyRHJhZyk7XHJcbiAgICAgICAgICAgIEV2ZW50TWFuYWdlci5PZmY8UG9pbnRlclVwU2lnbmFsPigoQWN0aW9uPFBvaW50ZXJVcFNpZ25hbD4pUG9pbnRlclVwKTtcclxuICAgICAgICAgICAgZWxlbWVudCE9bnVsbD9nbG9iYWw6OkJyaWRnZS5TY3JpcHQuRnJvbUxhbWJkYSgoKT0+ZWxlbWVudC5SZW1vdmUoKSk6bnVsbDtcclxuICAgICAgICAgICAgZWxlbWVudCA9IG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2b2lkIFBvaW50ZXJEb3duKFBvaW50ZXJEb3duU2lnbmFsIGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBlbGVtZW50LlN0eWxlLkRpc3BsYXkgPSBcIlwiO1xyXG4gICAgICAgICAgICBTZXREaXZQb3NpdGlvbihlLlZpZXdwb3J0WCwgZS5WaWV3cG9ydFksIDAsIDApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdm9pZCBQb2ludGVyRHJhZyhQb2ludGVyRHJhZ1NpZ25hbCBlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgU2V0RGl2UG9zaXRpb24oZS5BbmNob3JlZFgsIGUuQW5jaG9yZWRZLCBlLldpZHRoLCBlLkhlaWdodCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2b2lkIFBvaW50ZXJVcChQb2ludGVyVXBTaWduYWwgZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQuU3R5bGUuRGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdm9pZCBTZXREaXZQb3NpdGlvbihpbnQgeCwgaW50IHksIGludCB3aWR0aCwgaW50IGhlaWdodClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQuU3R5bGUuTGVmdCA9IHN0cmluZy5Gb3JtYXQoXCJ7MH1weFwiLHgpO1xyXG4gICAgICAgICAgICBlbGVtZW50LlN0eWxlLlRvcCA9IHN0cmluZy5Gb3JtYXQoXCJ7MH1weFwiLHkpO1xyXG4gICAgICAgICAgICBlbGVtZW50LlN0eWxlLldpZHRoID0gc3RyaW5nLkZvcm1hdChcInswfXB4XCIsd2lkdGgpO1xyXG4gICAgICAgICAgICBlbGVtZW50LlN0eWxlLkhlaWdodCA9IHN0cmluZy5Gb3JtYXQoXCJ7MH1weFwiLGhlaWdodCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIEJyaWRnZS5qUXVlcnkyO1xyXG51c2luZyBGZXN0aXZhbF9CcmlkZ2UuQXBpLkVkaXRvckNvbXBvbmVudHM7XHJcbnVzaW5nIEZlc3RpdmFsX0JyaWRnZS5BcGkuRWxlbWVudHM7XHJcbnVzaW5nIEZlc3RpdmFsX0JyaWRnZS5BcGkuRXZlbnRzO1xyXG51c2luZyBGZXN0aXZhbF9CcmlkZ2UuQXBpLk1hbmFnZWRBY3Rpb25zO1xyXG51c2luZyBGZXN0aXZhbF9CcmlkZ2UuQXBpLlRvb2xzO1xyXG51c2luZyBGZXN0aXZhbF9CcmlkZ2UuTWFuYWdlZEFjdGlvbnM7XHJcbnVzaW5nIFN5c3RlbTtcclxudXNpbmcgQ29uc29sZSA9IFN5c3RlbS5Db25zb2xlO1xyXG5cclxubmFtZXNwYWNlIEZlc3RpdmFsX0JyaWRnZS5Ub29sc1xyXG57XHJcbiAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAvLy8gVGhlIHJlY3RhbmdsZSBkcmF3aW5nIHRvb2wuXHJcbiAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgY2xhc3MgUmVjdFRvb2wgOiBJVG9vbFxyXG4gICAge1xyXG5wdWJsaWMgc3RyaW5nIFRvb2xJZFxyXG57XHJcbiAgICBnZXRcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gXCJyZWN0LVwiICsgR2V0SGFzaENvZGUoKTtcclxuICAgIH1cclxufXB1YmxpYyBjaGFyIEhvdEtleVxyXG57XHJcbiAgICBnZXRcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gJ1UnO1xyXG4gICAgfVxyXG59cHVibGljIHN0cmluZyBEaXNwbGF5TmFtZVxyXG57XHJcbiAgICBnZXRcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gXCJSZWN0YW5nbGVcIjtcclxuICAgIH1cclxufXB1YmxpYyBzdHJpbmcgSWNvbk5hbWVcclxue1xyXG4gICAgZ2V0XHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIFwiaWNvbnM4LXJlY3Rhbmd1bGFyLTMyXCI7XHJcbiAgICB9XHJcbn1wdWJsaWMgQ2F0ZWdvcnlOYW1lIENhdGVnb3J5XHJcbntcclxuICAgIGdldFxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBDYXRlZ29yeU5hbWUuU2hhcGU7XHJcbiAgICB9XHJcbn1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBDcmVhdGVTdmdSZWN0IGN1cnJlbnRBY3Rpb24gPSBudWxsO1xyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBBd2FrZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRW5hYmxlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEV2ZW50TWFuYWdlci5PbjxQb2ludGVyRG93blNpZ25hbD4oKEFjdGlvbjxQb2ludGVyRG93blNpZ25hbD4pT25Qb2ludGVyRG93bik7XHJcbiAgICAgICAgICAgIEV2ZW50TWFuYWdlci5PbjxQb2ludGVyVXBTaWduYWw+KChBY3Rpb248UG9pbnRlclVwU2lnbmFsPilPblBvaW50ZXJVcCk7XHJcbiAgICAgICAgICAgIEV2ZW50TWFuYWdlci5PbjxQb2ludGVyRHJhZ1NpZ25hbD4oKEFjdGlvbjxQb2ludGVyRHJhZ1NpZ25hbD4pT25Qb2ludGVyRHJhZyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBEaXNhYmxlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEV2ZW50TWFuYWdlci5PZmY8UG9pbnRlclVwU2lnbmFsPigoQWN0aW9uPFBvaW50ZXJVcFNpZ25hbD4pT25Qb2ludGVyVXApO1xyXG4gICAgICAgICAgICBFdmVudE1hbmFnZXIuT2ZmPFBvaW50ZXJEb3duU2lnbmFsPigoQWN0aW9uPFBvaW50ZXJEb3duU2lnbmFsPilPblBvaW50ZXJEb3duKTtcclxuICAgICAgICAgICAgRXZlbnRNYW5hZ2VyLk9mZjxQb2ludGVyRHJhZ1NpZ25hbD4oKEFjdGlvbjxQb2ludGVyRHJhZ1NpZ25hbD4pT25Qb2ludGVyRHJhZyk7XHJcbiAgICAgICAgICAgIGN1cnJlbnRBY3Rpb24gPSBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIE9uUG9pbnRlckRvd24oUG9pbnRlckRvd25TaWduYWwgZXYpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoY3VycmVudEFjdGlvbiAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgY3VycmVudEFjdGlvbi5VbmRvKCk7XHJcblxyXG4gICAgICAgICAgICBjdXJyZW50QWN0aW9uID0gbmV3IENyZWF0ZVN2Z1JlY3QoU3RhZ2UuQ3VycmVudC5DYW52YXMuQ3VycmVudExheWVyLkVsZW1lbnQpO1xyXG4gICAgICAgICAgICBjdXJyZW50QWN0aW9uLkRvKCk7XHJcbiAgICAgICAgICAgIGN1cnJlbnRBY3Rpb24uU2V0U2VsZWN0ZWRSZWN0KGV2LlN0YWdlWCwgZXYuU3RhZ2VZLCBldi5TdGFnZVgsIGV2LlN0YWdlWSk7XHJcbiAgICAgICAgICAgIGN1cnJlbnRBY3Rpb24uRWxlbWVudC5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJub25lXCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgT25Qb2ludGVyVXAoUG9pbnRlclVwU2lnbmFsIGV2KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKGN1cnJlbnRBY3Rpb24gIT0gbnVsbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKGV2Lk1vdXNlQnV0dG9uICE9IGV2LkFjdHVhbEJ1dHRvbilcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50QWN0aW9uLlVuZG8oKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50QWN0aW9uLlNldFNlbGVjdGVkUmVjdChldi5BbmNob3JlZFN0YWdlWCwgZXYuQW5jaG9yZWRTdGFnZVksIGV2LlN0YWdlWCwgZXYuU3RhZ2VZKTtcclxuICAgICAgICAgICAgICAgICAgICBDb25maXJtU2hhcGUoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGN1cnJlbnRBY3Rpb24gPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgQ29uZmlybVNoYXBlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChjdXJyZW50QWN0aW9uLklzTnVsbFNpemUoKSlcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRBY3Rpb24uVW5kbygpO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICBBY3Rpb25UaW1lbGluZS5JbnN0YW5jZS5EbyhjdXJyZW50QWN0aW9uLCB0cnVlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBPblBvaW50ZXJEcmFnKFBvaW50ZXJEcmFnU2lnbmFsIGV2KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY3VycmVudEFjdGlvbi5TZXRTZWxlY3RlZFJlY3QoZXYuQW5jaG9yZWRTdGFnZVgsIGV2LkFuY2hvcmVkU3RhZ2VZLCBldi5TdGFnZVgsIGV2LlN0YWdlWSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIEJyaWRnZS5qUXVlcnkyO1xyXG51c2luZyBGZXN0aXZhbF9CcmlkZ2UuQXBpLkVkaXRvckNvbXBvbmVudHM7XHJcbnVzaW5nIEZlc3RpdmFsX0JyaWRnZS5BcGkuRWxlbWVudHM7XHJcbnVzaW5nIEZlc3RpdmFsX0JyaWRnZS5BcGkuRXZlbnRzO1xyXG51c2luZyBGZXN0aXZhbF9CcmlkZ2UuQXBpLlRvb2xzO1xyXG5cclxubmFtZXNwYWNlIEZlc3RpdmFsX0JyaWRnZS5Ub29sc1xyXG57XHJcbiAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAvLy8gVGhlIG9sZCB0b29sIHRvIGRyYXcgcmVjdGFuZ2xlcywgYnV0IGl0IGlzIGFiYW5kb25lZCBiZWNhdXNlIGl0IGRvZXNcclxuICAgIC8vLyBub3QgdXNlIHRoZSA8c2VlIGNyZWY9XCJBcGkuTWFuYWdlZEFjdGlvbnMuQWN0aW9uVGltZWxpbmVcIi8+IGFuZCBkb2VzXHJcbiAgICAvLy8gbm90IHByb3ZpZGUgdGhlIGhpc3RvcnkgKyB1bmRvL3JlZG8gY2FwYWNpdGllcy4gSXQgYWxzbyBjaGFuZ2VzIHRoZSBTVkdcclxuICAgIC8vLyBkaXJlY3RseSwgd2hpY2ggaXMgdW5kZXNpcmVkLlxyXG4gICAgLy8vIDwvc3VtbWFyeT5cclxuICAgIFtTeXN0ZW0uT2Jzb2xldGUoXCJUaGlzIHRvb2wgZG9lcyBub3QgdXNlIHRoZSBNYW5hZ2VkIEFjdGlvbiBzeXN0ZW0uXCIpXVxyXG4gICAgY2xhc3MgUmVjdFRvb2xfT2xkTWFudWFsTW9kZSA6IElUb29sXHJcbiAgICB7XHJcbnB1YmxpYyBzdHJpbmcgVG9vbElkXHJcbntcclxuICAgIGdldFxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBcInJlY3QtXCIgKyBHZXRIYXNoQ29kZSgpO1xyXG4gICAgfVxyXG59cHVibGljIGNoYXIgSG90S2V5XHJcbntcclxuICAgIGdldFxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiAnVSc7XHJcbiAgICB9XHJcbn1wdWJsaWMgc3RyaW5nIERpc3BsYXlOYW1lXHJcbntcclxuICAgIGdldFxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBcIlJlY3RhbmdsZVwiO1xyXG4gICAgfVxyXG59cHVibGljIHN0cmluZyBJY29uTmFtZVxyXG57XHJcbiAgICBnZXRcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gXCJpY29uczgtcmVjdGFuZ3VsYXItMzJcIjtcclxuICAgIH1cclxufXB1YmxpYyBDYXRlZ29yeU5hbWUgQ2F0ZWdvcnlcclxue1xyXG4gICAgZ2V0XHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIENhdGVnb3J5TmFtZS5TaGFwZTtcclxuICAgIH1cclxufVxyXG4gICAgICAgIHByaXZhdGUgUmV0eXBlZC5kb20uU1ZHUmVjdEVsZW1lbnQgY3VycmVudFN2Z1JlY3QgPSBudWxsO1xyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBBd2FrZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRW5hYmxlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEV2ZW50TWFuYWdlci5PbjxQb2ludGVyRG93blNpZ25hbD4oKFN5c3RlbS5BY3Rpb248UG9pbnRlckRvd25TaWduYWw+KU9uUG9pbnRlckRvd24pO1xyXG4gICAgICAgICAgICBFdmVudE1hbmFnZXIuT248UG9pbnRlclVwU2lnbmFsPigoU3lzdGVtLkFjdGlvbjxQb2ludGVyVXBTaWduYWw+KU9uUG9pbnRlclVwKTtcclxuICAgICAgICAgICAgRXZlbnRNYW5hZ2VyLk9uPFBvaW50ZXJEcmFnU2lnbmFsPigoU3lzdGVtLkFjdGlvbjxQb2ludGVyRHJhZ1NpZ25hbD4pT25Qb2ludGVyRHJhZyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBEaXNhYmxlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEV2ZW50TWFuYWdlci5PZmY8UG9pbnRlclVwU2lnbmFsPigoU3lzdGVtLkFjdGlvbjxQb2ludGVyVXBTaWduYWw+KU9uUG9pbnRlclVwKTtcclxuICAgICAgICAgICAgRXZlbnRNYW5hZ2VyLk9mZjxQb2ludGVyRG93blNpZ25hbD4oKFN5c3RlbS5BY3Rpb248UG9pbnRlckRvd25TaWduYWw+KU9uUG9pbnRlckRvd24pO1xyXG4gICAgICAgICAgICBFdmVudE1hbmFnZXIuT2ZmPFBvaW50ZXJEcmFnU2lnbmFsPigoU3lzdGVtLkFjdGlvbjxQb2ludGVyRHJhZ1NpZ25hbD4pT25Qb2ludGVyRHJhZyk7XHJcbiAgICAgICAgICAgIGN1cnJlbnRTdmdSZWN0ID0gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBPblBvaW50ZXJEb3duKFBvaW50ZXJEb3duU2lnbmFsIGV2KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY3VycmVudFN2Z1JlY3QgPSBjdXJyZW50U3ZnUmVjdCA9IFJldHlwZWQuZG9tLmRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhUb29sVXRpbHMuU3ZnTmFtZXNwYWNlLCBcInJlY3RcIikgYXMgUmV0eXBlZC5kb20uU1ZHUmVjdEVsZW1lbnQ7XHJcbiAgICAgICAgICAgIGN1cnJlbnRTdmdSZWN0LnNldEF0dHJpYnV0ZU5TKG51bGwsIFwieFwiLCBzdHJpbmcuRm9ybWF0KFwiezB9cHhcIixldi5TdGFnZVgpKTtcclxuICAgICAgICAgICAgY3VycmVudFN2Z1JlY3Quc2V0QXR0cmlidXRlTlMobnVsbCwgXCJ5XCIsIHN0cmluZy5Gb3JtYXQoXCJ7MH1weFwiLGV2LlN0YWdlWSkpO1xyXG4gICAgICAgICAgICBjdXJyZW50U3ZnUmVjdC5zZXRBdHRyaWJ1dGVOUyhudWxsLCBcIndpZHRoXCIsIFwiMFwiKTtcclxuICAgICAgICAgICAgY3VycmVudFN2Z1JlY3Quc2V0QXR0cmlidXRlTlMobnVsbCwgXCJoZWlnaHRcIiwgXCIwXCIpO1xyXG4gICAgICAgICAgICBjdXJyZW50U3ZnUmVjdC5zZXRBdHRyaWJ1dGVOUyhudWxsLCBcInN0cm9rZVwiLCBcImJsYWNrXCIpO1xyXG4gICAgICAgICAgICBjdXJyZW50U3ZnUmVjdC5zZXRBdHRyaWJ1dGVOUyhudWxsLCBcImZpbGxcIiwgXCJ0cmFuc3BhcmVudFwiKTtcclxuICAgICAgICAgICAgY3VycmVudFN2Z1JlY3Quc3R5bGUucG9pbnRlckV2ZW50cyA9IFwibm9uZVwiO1xyXG4gICAgICAgICAgICBTdGFnZS5DdXJyZW50LkNhbnZhcy5DdXJyZW50TGF5ZXIuRWxlbWVudC5BcHBlbmQobmV3IGpRdWVyeShjdXJyZW50U3ZnUmVjdCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIE9uUG9pbnRlclVwKFBvaW50ZXJVcFNpZ25hbCBldilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChjdXJyZW50U3ZnUmVjdCAhPSBudWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZXYuTW91c2VCdXR0b24gIT0gZXYuQWN0dWFsQnV0dG9uKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRTdmdSZWN0LnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRTdmdSZWN0ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50U3ZnUmVjdCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBPblBvaW50ZXJEcmFnKFBvaW50ZXJEcmFnU2lnbmFsIGV2KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY3VycmVudFN2Z1JlY3Quc2V0QXR0cmlidXRlTlMobnVsbCwgXCJ4XCIsIHN0cmluZy5Gb3JtYXQoXCJ7MH1weFwiLGV2LkFuY2hvcmVkU3RhZ2VYKSk7XHJcbiAgICAgICAgICAgIGN1cnJlbnRTdmdSZWN0LnNldEF0dHJpYnV0ZU5TKG51bGwsIFwieVwiLCBzdHJpbmcuRm9ybWF0KFwiezB9cHhcIixldi5BbmNob3JlZFN0YWdlWSkpO1xyXG4gICAgICAgICAgICBjdXJyZW50U3ZnUmVjdC5zZXRBdHRyaWJ1dGVOUyhudWxsLCBcIndpZHRoXCIsIHN0cmluZy5Gb3JtYXQoXCJ7MH1weFwiLGV2LldpZHRoKSk7XHJcbiAgICAgICAgICAgIGN1cnJlbnRTdmdSZWN0LnNldEF0dHJpYnV0ZU5TKG51bGwsIFwiaGVpZ2h0XCIsIHN0cmluZy5Gb3JtYXQoXCJ7MH1weFwiLGV2LkhlaWdodCkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBCcmlkZ2UualF1ZXJ5MjtcclxudXNpbmcgRmVzdGl2YWxfQnJpZGdlLk1hbmFnZWRBY3Rpb25zLkJhc2U7XHJcbnVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcclxuXHJcbm5hbWVzcGFjZSBGZXN0aXZhbF9CcmlkZ2UuTWFuYWdlZEFjdGlvbnNcclxue1xyXG4gICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgLy8vIEEgbWFuYWdlZCBhY3Rpb24gZm9yIHRoZSByZWN0YW5nbGUgZHJhd2luZyB0b29sLlxyXG4gICAgLy8vIDwvc3VtbWFyeT5cclxuICAgIGNsYXNzIENyZWF0ZVN2Z1JlY3QgOiBDcmVhdGVTdmdFbGVtZW50PFJldHlwZWQuZG9tLlNWR1JlY3RFbGVtZW50PlxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBDcmVhdGVTdmdSZWN0KGpRdWVyeSBwYXJlbnQpIDogYmFzZShwYXJlbnQpIHsgfVxyXG5wdWJsaWMgb3ZlcnJpZGUgc3RyaW5nIERpc3BsYXlOYW1lXHJcbntcclxuICAgIGdldFxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBcIkNyZWF0ZSBSZWN0YW5nbGVcIjtcclxuICAgIH1cclxufXB1YmxpYyBvdmVycmlkZSBzdHJpbmcgU3ZnVGFnTmFtZVxyXG57XHJcbiAgICBnZXRcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gXCJyZWN0XCI7XHJcbiAgICB9XHJcbn1cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgdm9pZCBSZWZyZXNoRWxlbWVudChSZXR5cGVkLmRvbS5TVkdSZWN0RWxlbWVudCBlbGVtZW50KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgYmFzZS5SZWZyZXNoRWxlbWVudChlbGVtZW50KTtcclxuICAgICAgICAgICAgdmFyIGVsID0gRXh0ZXJuYWxzLlVudHlwZTxCcmlkZ2UuSHRtbDUuSFRNTEVsZW1lbnQ+KGVsZW1lbnQpO1xyXG4gICAgICAgICAgICBlbC5TZXRBdHRyaWJ1dGVOUyhudWxsLCBcInhcIiwgc3RyaW5nLkZvcm1hdChcInswfXB4XCIsU3RhcnRYKSk7XHJcbiAgICAgICAgICAgIGVsLlNldEF0dHJpYnV0ZU5TKG51bGwsIFwieVwiLCBzdHJpbmcuRm9ybWF0KFwiezB9cHhcIixTdGFydFkpKTtcclxuICAgICAgICAgICAgZWwuU2V0QXR0cmlidXRlTlMobnVsbCwgXCJ3aWR0aFwiLCBzdHJpbmcuRm9ybWF0KFwiezB9cHhcIixXaWR0aCkpO1xyXG4gICAgICAgICAgICBlbC5TZXRBdHRyaWJ1dGVOUyhudWxsLCBcImhlaWdodFwiLCBzdHJpbmcuRm9ybWF0KFwiezB9cHhcIixIZWlnaHQpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl0KfQo=
