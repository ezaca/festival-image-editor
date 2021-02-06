// This file is used by Code Analysis to maintain SuppressMessage
// attributes that are applied to this project.
// Project-level suppressions either have no target or are given
// a specific target and scoped to a namespace, type, member, etc.

using System.Diagnostics.CodeAnalysis;

// I don't want to maek specific exceptions, I am fine with the general ones.
[assembly: SuppressMessage("Design", "CA1031:Do not catch general exception types", Justification = "<Pendente>", Scope = "member", Target = "~M:Festival_Bridge.Api.Events.EventManager.Dispatch``1(``0)")]

// Bridge.NET does not support "default", it requires "default(T)".
// See: https://github.com/bridgedotnet/Bridge/issues/4046
[assembly: SuppressMessage("Style", "IDE0034:Simplificar expressão 'default'", Justification = "<Pendente>", Scope = "member", Target = "~M:Festival_Bridge.ManagedActions.Base.CreateSvgElement`1.Undo~System.Boolean")]
