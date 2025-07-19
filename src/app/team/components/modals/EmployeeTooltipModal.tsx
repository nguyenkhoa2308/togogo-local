"use client";

import {
  useFloating,
  offset,
  flip,
  shift,
  autoUpdate,
} from "@floating-ui/react-dom";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Mail, Phone, Calendar, MapPin, Briefcase } from "lucide-react";
import { Employee, MousePosition } from "../../types";
import Image from "next/image";

interface Props {
  employee: Employee | null;
  mousePosition: MousePosition;
  onEnter?: () => void;
  onLeave?: () => void;
}

export default function EmployeeTooltipModal({
  employee,
  mousePosition,
  onEnter,
  onLeave,
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const virtualEl = {
    getBoundingClientRect: () =>
      DOMRect.fromRect({
        x: mousePosition.x,
        y: mousePosition.y,
        width: 0,
        height: 0,
      }),
  };

  const { x, y, strategy, refs, update } = useFloating({
    middleware: [offset(12), flip(), shift()],
    placement: "right-start",
  });

  useEffect(() => {
    if (!employee) return;
    refs.setReference(virtualEl);
    refs.setFloating(ref.current);

    return autoUpdate(virtualEl, ref.current!, update);
  }, [employee, mousePosition.x, mousePosition.y]);

  if (!employee || x == null || y == null) return null;

  return createPortal(
    <div
      ref={ref}
      style={{
        position: strategy,
        top: y,
        left: x,
        width: 360,
        zIndex: 9999,
      }}
      className="bg-slate-800/95 backdrop-blur-sm border border-slate-600/50 rounded-2xl p-6 shadow-xl text-white"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-14 h-14 rounded-full border-2 border-emerald-500/20 overflow-hidden bg-slate-700 text-white flex items-center justify-center text-sm font-bold">
          {employee.avatar ? (
            <Image
              src={employee.avatar}
              alt={employee.name}
              width={56} // hoặc 56 = w-14
              height={56}
              unoptimized
              className="w-full h-full object-cover"
            />
          ) : (
            employee.name
              .split(" ")
              .map((n) => n[0])
              .join("")
          )}
        </div>

        <div>
          <h2 className="text-lg font-semibold text-white">{employee.name}</h2>
          <p className="text-slate-300 text-sm">{employee.position}</p>
          {employee.department && (
            <span className="inline-block mt-1 text-xs border border-emerald-500/50 text-emerald-300 px-2 py-0.5 rounded-md">
              {employee.department}
            </span>
          )}
        </div>
      </div>

      <div className="space-y-4 text-sm">
        {/* Contact */}
        <div>
          <h3 className="font-semibold mb-2 flex items-center gap-2 text-white text-sm">
            <Mail className="w-4 h-4 text-emerald-400" /> Thông tin liên hệ
          </h3>
          <div className="grid gap-1 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <Mail className="w-3 h-3" /> {employee.email}
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-3 h-3" /> {employee.phone}
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-3 h-3" /> {employee.location}
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-3 h-3" /> Gia nhập: {employee.joinDate}
            </div>
          </div>
        </div>

        <hr className="border-slate-600/50" />

        {/* Experience */}
        <div>
          <h3 className="font-semibold mb-2 flex items-center gap-2 text-white text-sm">
            <Briefcase className="w-4 h-4 text-emerald-400" /> Kinh nghiệm
          </h3>
          <p className="text-xs text-slate-300">{employee.experience}</p>
        </div>

        {/* Skills */}
        {Array.isArray(employee.skills) && employee.skills.length > 0 && (
          <>
            <hr className="border-slate-600/50" />
            <div>
              <h3 className="font-semibold mb-2 text-white text-sm">
                Kỹ năng chuyên môn
              </h3>
              <div className="flex flex-wrap gap-1">
                {employee.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="bg-slate-700/50 text-slate-200 px-2 py-0.5 rounded-md text-xs"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Bio */}
        {employee.bio && (
          <>
            <hr className="border-slate-600/50" />
            <div>
              <h3 className="font-semibold mb-2 text-white text-sm">
                Giới thiệu
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {employee.bio}
              </p>
            </div>
          </>
        )}
      </div>
    </div>,
    document.body
  );
}
