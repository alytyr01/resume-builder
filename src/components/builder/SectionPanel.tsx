import { useResumeStore } from '@/store/resumeStore';
import { useUIStore } from '@/store/uiStore';
import { Card, CardHeader, CardTitle, CardContent, Button, Switch } from '@/components/ui';
import { PersonalInfoForm } from '@/components/forms/PersonalInfoForm';
import { SummaryForm } from '@/components/forms/SummaryForm';
import { ExperienceForm } from '@/components/forms/ExperienceForm';
import { EducationForm } from '@/components/forms/EducationForm';
import { SkillsForm } from '@/components/forms/SkillsForm';
import { ProjectsForm } from '@/components/forms/ProjectsForm';
import { CertificationsForm } from '@/components/forms/CertificationsForm';
import { LanguagesForm } from '@/components/forms/LanguagesForm';
import { ReferencesForm } from '@/components/forms/ReferencesForm';
import { CustomSectionForm } from '@/components/forms/CustomSectionForm';
import { ChevronDown, ChevronRight, Eye, EyeOff, Plus, GripVertical } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors, type DragEndEvent } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';

function SortableSection({ id, index }: { id: string; index: number }) {
  const section = useResumeStore((s) => s.resume.sections.find((sec) => sec.id === id))!;
  const toggleCollapse = useResumeStore((s) => s.toggleSectionCollapse);
  const toggleVisibility = useResumeStore((s) => s.toggleSectionVisibility);
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  const style = { transform: CSS.Transform.toString(transform), transition };

  const renderForm = () => {
    switch (section.type) {
      case 'personal': return <PersonalInfoForm />;
      case 'summary': return <SummaryForm />;
      case 'experience': return <ExperienceForm />;
      case 'education': return <EducationForm />;
      case 'skills': return <SkillsForm />;
      case 'projects': return <ProjectsForm />;
      case 'certifications': return <CertificationsForm />;
      case 'languages': return <LanguagesForm />;
      case 'references': return <ReferencesForm />;
      case 'custom': return <CustomSectionForm sectionId={section.id} />;
      default: return null;
    }
  };

  return (
    <div ref={setNodeRef} style={style} className={isDragging ? 'opacity-50' : ''}>
      <Card>
        <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <button {...attributes} {...listeners} className="cursor-grab text-slate-400 hover:text-slate-600">
              <GripVertical className="h-4 w-4" />
            </button>
            <CardTitle className="text-sm">{section.title}</CardTitle>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" onClick={() => toggleVisibility(id)} title={section.visible ? 'Hide' : 'Show'}>
              {section.visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4 text-slate-400" />}
            </Button>
            <Button variant="ghost" size="icon" onClick={() => toggleCollapse(id)}>
              {section.collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </div>
        </div>
        <AnimatePresence initial={false}>
          {!section.collapsed && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <CardContent className="pt-4">{renderForm()}</CardContent>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </div>
  );
}

export function SectionPanel() {
  const sections = useResumeStore((s) => s.resume.sections);
  const reorderSections = useResumeStore((s) => s.reorderSections);
  const addCustomSection = useResumeStore((s) => s.addCustomSection);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = sections.findIndex((s) => s.id === active.id);
      const newIndex = sections.findIndex((s) => s.id === over.id);
      reorderSections(oldIndex, newIndex);
    }
  }

  return (
    <div className="space-y-4">
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd} modifiers={[restrictToVerticalAxis]}>
        <SortableContext items={sections.map((s) => s.id)} strategy={verticalListSortingStrategy}>
          {sections.map((section, i) => (
            <SortableSection key={section.id} id={section.id} index={i} />
          ))}
        </SortableContext>
      </DndContext>
      <Button variant="outline" size="sm" onClick={addCustomSection} className="w-full">
        <Plus className="mr-1 h-4 w-4" /> Add Custom Section
      </Button>
    </div>
  );
}
